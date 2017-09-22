"use strict";


// TODO: topic module
// TODO: editTopic module
// TODO: use patched ace build

// watch
// TODO: sass: separate file
// TODO: sass: minify
// TODO: sass: sourcemaps ? concat in dev mode?
// TODO: sass autoprefixer: add vendor prefixes from can I use: postcss-loader'
// TODO: analyze tslint server
// watch tests

import * as ts from "gulp-typescript";
import * as g$if from "gulp-if";
import * as rev from "gulp-rev";
import * as concat from "gulp-concat";
import * as inject from "gulp-inject";
import * as gulp from "gulp";
import * as del from "del";
import * as config from "./build.config";
import * as pug from "gulp-pug";
import * as yargs from "yargs";
import * as filter from "gulp-filter";
import * as sourcemaps from "gulp-sourcemaps";
import * as streamqueue from "streamqueue";
import * as exec from "gulp-exec";
import * as webpack from "webpack-stream";
import * as named from "vinyl-named";
import * as webpackconfig from "./webpack.config";

const htmlFilter = filter("**/*.html"),
  jsFilter = filter("**/*.js"),
  tsFilter = filter("**/*.ts");

// copy patched libraries into node_modules dir
gulp.task("patchLibs", () =>
  gulp.src(config.libFiles)
    .pipe(gulp.dest("node_modules"))
);
// clean all
gulp.task("clean", () => del(config.client.out.root));

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

gulp.task("copy",["copyTypeDefinitions", "copyAce"]);

// compile index.jade and copy into build directory
// gulp.task("index", () =>
// gulp.src(config.client.indexFile)
//   .pipe(pug())
//   .pipe(gulp.dest(config.client.out.root))
// );

gulp.task("pre-build", ["copy"]);

gulp.task("analyze", () => {
  // return gulp.src(config.tsFiles)
  //   .pipe(tslint())
  //   .pipe(tslint.report());
});

// compile scripts and copy into build directory
gulp.task("scripts", () => {
  return gulp
  .src(config.client.scriptEntry)
  .pipe(webpack(webpackconfig))
  .pipe(gulp.dest(config.client.out.root));
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

// watch frontend/backend
gulp.task("watch", () => {
  gulp.start("build");
});

gulp.task("stop-mongo", runCommand("mongo --eval 'db.getSiblingDB(\"admin\").shutdownServer()'"));

// export current db
gulp.task("mongo-export", runCommand("mongoexport --db koans --collection topics --out app-node/sample-data/topics.bson"));

gulp.task("build", ["scripts", "analyze"]);

gulp.task("dev", ["pre-build", "watch"]);

gulp.task("default", ["dev"]);


