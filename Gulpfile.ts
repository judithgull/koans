"use strict";

import * as ts from "gulp-typescript";
import * as g$if from "gulp-if";
import * as sass from "gulp-sass";
import * as uglify from "gulp-uglify";
import * as ngAnnotate from "gulp-ng-annotate";
import * as rev from "gulp-rev";
import * as concat from "gulp-concat";
import * as autoprefixer from "gulp-autoprefixer";
import * as inject from "gulp-inject";
import * as gulp from "gulp";
import tslint from "gulp-tslint";
import * as del from "del";
import * as config from "./build.config";
import * as nodemon from "nodemon";
import * as browserSync from "browser-sync";
import * as pug from "gulp-pug";
import * as yargs from "yargs";
import * as filter from "gulp-filter";
import * as cssmin from "gulp-cssmin";
import * as uglifySaveLicense from "uglify-save-license";
import * as sourcemaps from "gulp-sourcemaps";
import * as ngHtml2js from "gulp-ng-html2js";
import * as angularFilesort from "gulp-angular-filesort";
import * as favicons from "gulp-favicons";
import * as imagemin from "gulp-imagemin";
import * as karmaConf from "./karma.config";
import * as gulpFilter from "gulp-filter";
import * as streamqueue from "streamqueue";
import * as karma from "karma";
import * as exec from "gulp-exec";

var isProd = yargs.argv.stage === "prod";
var htmlFilter = filter("**/*.html"),
  jsFilter = filter("**/*.js"),
  tsFilter = filter("**/*.ts");

karmaConf.files = [];


// copy patched libraries into node_modules dir
gulp.task("patchLibs", () =>
  gulp.src(config.libFiles)
    .pipe(gulp.dest("node_modules"))
);
// clean all
gulp.task("clean", () => del(config.client.out.root));

// clean node
gulp.task("node:clean", () => del(config.server.out.root));

// copy and optimize images into build directory
gulp.task("assets", () =>
  gulp.src(config.client.assetFiles)
    .pipe(g$if(isProd, imagemin()))
    .pipe(gulp.dest(config.client.out.assetDir))
);

// copy typescripts/lib.d.ts to build directory
gulp.task("copyTypeDefinitions", () => {
  return gulp.src([config.typingsStd, config.typings])
    .pipe(gulp.dest(config.client.out.typings));
});

// copy current typescriptServices from node_modules into build directory
gulp.task("copyTsServices", () =>
gulp.src(config.tsServicesFiles)
  .pipe(gulp.dest(config.client.out.aceSrc))
);


gulp.task("copyAce", ["copyTsServices"], () => {
  return gulp.src([
    "node_modules/ace-builds/src-min-noconflict/ace.js",
    "node_modules/ace-builds/src-min-noconflict/mode-typescript.js",
    "node_modules/ace-builds/src-min-noconflict/mode-javascript.js",
    "node_modules/ace-builds/src-min-noconflict/theme-tomorrow_night_bright.js",
    "node_modules/ace-builds/src-min-noconflict/worker-javascript.js",
    "node_modules/ace-builds/src-min-noconflict/worker-typescript.js"
  ], { base: "node_modules" })
    .pipe(gulp.dest(config.client.out.vendorDir));
});

// copy third party components into build directory ,
gulp.task("vendorCopy",["copyAce"], () => {
  var jsNoAceFilter = filter(["**/*.js", "!ace-builds/**"]);
  return gulp.src(
    ["node_modules/jquery/dist/jquery.min.js",
      "node_modules/angular/angular.min.js",
      "node_modules/angular-messages/angular-messages.min.js",
      "node_modules/angular-sanitize/angular-sanitize.min.js",
      "node_modules/angular-ui-ace/src/ui-ace.js",
      "node_modules/angular-ui-router/release/angular-ui-router.min.js",
      "node_modules/chai/chai.js",
      "node_modules/rx-lite/rx.lite.min.js",
      "node_modules/angular-aria/angular-aria.min.js",
      "node_modules/angular-ellipsis/src/angular-ellipsis.min.js",
      "node_modules/toastr/build/toastr.min.js",
      "node_modules/angular-animate/angular-animate.min.js"],
    { base: "node_modules" })
    .pipe(jsNoAceFilter)
    .pipe(g$if(isProd, concat("vendor.js")))
    .pipe(g$if(isProd, uglify({
      preserveComments: uglifySaveLicense
    })))
    .pipe(g$if(isProd, rev()))
    .pipe(gulp.dest(config.client.out.vendorDir));
});

gulp.task("copy",["assets", "copyTypeDefinitions", "vendorCopy"]);


// compile index.jade and copy into build directory
gulp.task("index", () =>
gulp.src(config.client.indexFile)
  .pipe(pug())
  .pipe(gulp.dest(config.client.out.root))
);

// copy and favicons and add to index.html
gulp.task("favicons", ["index"], () => {
  gulp.src(config.client.favicon).pipe(favicons({
    display: "standalone",
    orientation: "portrait",
    version: 1.0,
    logging: false,
    online: false,
    html: config.client.out.index
  })).pipe(gulp.dest(config.client.out.root));
});

gulp.task("pre-build", ["copy", "favicons"]);

// compile styles and copy into build directory
gulp.task("styles", () => {
  return gulp.src(config.client.styleFiles)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(g$if(isProd, concat("app.css")))
    .pipe(g$if(isProd, cssmin()))
    .pipe(g$if(isProd, rev()))
    .pipe(gulp.dest(config.client.out.styleDir));
});

// compile markup files and copy into build directory
gulp.task("markup", () => {
  return gulp.src(config.client.markupFiles)
    .pipe(pug())
    .pipe(gulp.dest(config.client.out.root));
});

gulp.task("analyze", () => {
  return gulp.src(config.tsFiles)
    .pipe(tslint())
    .pipe(tslint.report());
});

// compile scripts and copy into build directory
gulp.task("scripts", ["analyze"], () => {
  const tsProject = ts.createProject("tsconfig-frontend.json");

  return gulp.src([
    config.client.scriptFiles,
    config.client.out.markupFiles,
    "!**/*_test.*",
    "!**/index.html"
  ])
    .pipe(sourcemaps.init())
    .pipe(tsFilter)
    .pipe(tsProject())
    .pipe(tsFilter.restore())
    .pipe(g$if(isProd, htmlFilter))
    .pipe(g$if(isProd, ngHtml2js({
      moduleName: "koans",
      declareModule: false
    })))
    .pipe(g$if(isProd, htmlFilter.restore()))
    .pipe(jsFilter)
    .pipe(g$if(isProd, angularFilesort()))
    .pipe(g$if(isProd, concat("app.js")))
    .pipe(g$if(isProd, ngAnnotate()))
    .pipe(g$if(isProd, uglify()))
    .pipe(g$if(isProd, rev()))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.client.out.jsDir))
    .pipe(jsFilter.restore());
});

// inject CSS and JavaScript into index.html
gulp.task("inject", ["markup", "styles", "scripts"], () => {
  var jsFilter = filter("**/*.js");

  return gulp
    .src(config.client.out.index)
    .pipe(inject(
      gulp.src(config.client.out.vendorDir + "/**/*"), {
        name: "vendor",
        addRootSlash: false,
        ignorePath: config.client.out.root
      }))
    .pipe(inject(gulp.src([
      config.client.out.styleDir + "/**/*",
      config.client.out.jsDir + "/**/*"
    ])
      .pipe(jsFilter)
      .pipe(angularFilesort())
      .pipe(jsFilter.restore()), {
        addRootSlash: false,
        ignorePath: config.client.out.root
      })
    )
    .pipe(gulp.dest(config.client.out.root));
});

gulp.task("node:build", () => {
  var tsFilter = filter("**/*.ts");
  const tsProject = ts.createProject("tsconfig.json");
  return gulp.src(config.server.scriptFiles)
    .pipe(g$if(!isProd, sourcemaps.init()))
    .pipe(tsFilter)
    .pipe(tsProject())
    .pipe(tsFilter.restore())
    .pipe(g$if(!isProd, sourcemaps.write(".",{})))
    .pipe(gulp.dest(config.server.out.root))
});

gulp.task("buildTests", ["build"], () => {
  var testFilter = gulpFilter("**/**");
  const tsProject = ts.createProject("tsconfig.json");
  return gulp.src([
    config.client.unitTestFiles,
    config.client.scriptFiles
  ])
    .pipe(testFilter)
    .pipe(tsProject())
    .pipe(testFilter.restore())
    .pipe(gulp.dest(config.client.out.unitTestDir));
});

// inject scripts in karma.config.js
gulp.task("karmaFiles", ["buildTests"], () => {
  var stream = streamqueue({ objectMode: true });

  // add vendor javascript
  stream.queue(gulp.src(config.client.out.vendorDir + "/**/*.js"));
  stream.queue(gulp.src("node_modules/angular-mocks/angular-mocks.js"));
  // add application templates
  stream.queue(gulp.src([config.client.out.directives]));

  // add application javascript
  stream.queue(gulp.src([
    config.client.out.jsFiles,
    "!**/*_test.*"
  ])
    .pipe(angularFilesort()));

  // add unit tests
  stream.queue(gulp.src(config.client.out.unitTestFiles));

  return stream.done()
    .on("data", (file) => {
      karmaConf.files.push(file.path);
    });
});

// run unit tests
gulp.task("unitTest", ["karmaFiles"], (done: any) => {
  karma.server.start(karmaConf, (exitCode) => {
    console.log("Karma has exited with " + exitCode);
    done(exitCode);
  });
});


const runCommand = (command) => {
  return (cb) => {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
};

gulp.task("mongod", () => {
  var f = runCommand("mongod");
  f((err) => {
    if (err) {
      console.log("Error in mongod. Already started?");
      console.log(err);
    }
  });
});


// use nodemon to watch node server
gulp.task("nodemon", ["build"], (cb) => {
  var started = false;

  return nodemon({
    script: config.server.out.app
  }).on("start", () => {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});


gulp.task("browserSync", ["frontend:build"], () => {
  browserSync.reload();
});

// watch frontend/backend
gulp.task("watch", ["nodemon", "node:build"], () => {
  browserSync({
    proxy: "http://localhost:3000/",
    port: 7000
  });
  gulp.watch([
    config.client.scriptFiles,
    config.client.markupFiles,
    config.client.styleFiles,
    "!" + config.client.unitTestFiles]);
});

gulp.task("stop-mongo", runCommand("mongo --eval 'db.getSiblingDB(\"admin\").shutdownServer()'"));

// export current db
gulp.task("mongo-export", runCommand("mongoexport --db koans --collection topics --out app-node/sample-data/topics.bson"));

gulp.task("frontend:build", ["inject"]);

gulp.task("build", ["node:build", "frontend:build"]);

gulp.task("dev", ["pre-build", "watch", "mongod"]);

gulp.task("default", ["dev"]);


