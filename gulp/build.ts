"use strict";

import * as _ from "underscore.string";
import * as path from "path";
import * as config from "../build.config";
import * as ts from "gulp-typescript";

const pug = require("gulp-pug");

module.exports = (gulp, $) => {
  var isProd = $.yargs.argv.stage === "prod";

  gulp.task("node:build", () => {
    var tsFilter = $.filter("**/*.ts");
    const tsProject = ts.createProject("tsconfig.json");
    return gulp.src(config.server.scriptFiles)
      .pipe($.if(!isProd, $.sourcemaps.init()))
      .pipe(tsFilter)
      .pipe($.typescript(tsProject))
      .pipe(tsFilter.restore())
      .pipe($.if(!isProd, $.sourcemaps.write(".")))
      .pipe(gulp.dest(config.server.out.root))
  });

  // compile markup files and copy into build directory
  gulp.task("markup", () => {
    return gulp.src(config.client.markupFiles)
      .pipe(pug())
      .pipe(gulp.dest(config.client.out.root));
  });

  // compile styles and copy into build directory
  gulp.task("styles", () => {
    return gulp.src(config.client.styleFiles)
      .pipe($.plumber({
        errorHandler: (err) => {
          $.notify.onError({
            title: "Error linting at " + err.plugin,
            subtitle: " ", // overrides defaults
            message: err.message.replace(/\u001b\[.*?m/g, ""),
            sound: " " // overrides defaults
          })(err);

          this.emit("end");
        }
      }))
      .pipe($.sass())
      .pipe($.autoprefixer())
      .pipe($.if(isProd, $.concat("app.css")))
      .pipe($.if(isProd, $.cssmin()))
      .pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.client.out.styleDir));
  });


  // compile scripts and copy into build directory
  gulp.task("scripts", ["analyze", "markup"], () => {
    var htmlFilter = $.filter("**/*.html")
      , jsFilter = $.filter("**/*.js")
      , tsFilter = $.filter("**/*.ts");
    const tsProject = ts.createProject("tsconfig.json");

    return gulp.src([
      config.client.scriptFiles,
      config.client.out.markupFiles,
      "!**/*_test.*",
      "!**/index.html"
    ])
      .pipe($.sourcemaps.init())
      .pipe(tsFilter)
      .pipe($.typescript(tsProject))
      .pipe(tsFilter.restore())
      .pipe($.if(isProd, htmlFilter))
      .pipe($.if(isProd, $.ngHtml2js({
        // lower camel case all app names
        moduleName: _.camelize(_.slugify(_.humanize(require("../package.json").name))),
        declareModule: false
      })))
      .pipe($.if(isProd, htmlFilter.restore()))
      .pipe(jsFilter)
      .pipe($.if(isProd, $.angularFilesort()))
      .pipe($.if(isProd, $.concat("app.js")))
      .pipe($.if(isProd, $.ngAnnotate()))
      .pipe($.if(isProd, $.uglify()))
      .pipe($.if(isProd, $.rev()))
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest(config.client.out.jsDir))
      .pipe(jsFilter.restore());
  });

  // inject custom CSS and JavaScript into index.html
  gulp.task("inject", ["markup", "styles", "scripts"], () => {
    var jsFilter = $.filter("**/*.js");

    return gulp.src(config.client.out.index)
      .pipe($.inject(gulp.src([
          config.client.out.styleDir + "/**/*",
          config.client.out.jsDir + "/**/*"
        ])
          .pipe(jsFilter)
          .pipe($.angularFilesort())
          .pipe(jsFilter.restore()), {
          addRootSlash: false,
          ignorePath: config.client.out.root
        })
      )
      .pipe(gulp.dest(config.client.out.root));
  });

  gulp.task("bowerCopyCss", ["inject"], () => {
    var cssFilter = $.filter("**/*.css");
    return gulp.src($.mainBowerFiles(), {base: config.bowerDir})
      .pipe(cssFilter)
      .pipe($.if(isProd, $.modifyCssUrls({
        modify: (url, filePath) => {
          if (url.indexOf("http") !== 0 && url.indexOf("data:") !== 0) {
            filePath = path.dirname(filePath) + path.sep;
            filePath = filePath.substring(filePath.indexOf(config.bowerDir) + config.bowerDir.length,
              filePath.length);
          }
          url = path.normalize(filePath + url);
          url = url.replace(/[/\\]/g, "/");
          return url;
        }
      })))
      .pipe($.if(isProd, $.concat("vendor.css")))
      .pipe($.if(isProd, $.cssmin()))
      .pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.client.out.vendorDir))
  });

  gulp.task("bowerCopyAce", ["inject"], () => {
    var aceFilter = $.filter("ace-builds/**/*.js");
    return gulp.src($.mainBowerFiles(), {base: config.bowerDir})
      .pipe(aceFilter)
      .pipe(gulp.dest(config.client.out.vendorDir));
  });

  // copy bower components into build directory
  gulp.task("bowerCopy", ["inject", "bowerCopyCss", "bowerCopyAce"], () => {
    var jsNoAceFilter = $.filter(["**/*.js", "!ace-builds/**"]);
    return gulp.src($.mainBowerFiles(), {base: config.bowerDir})
      .pipe(jsNoAceFilter)
      .pipe($.if(isProd, $.concat("vendor.js")))
      .pipe($.if(isProd, $.uglify({
        preserveComments: $.uglifySaveLicense
      })))
      .pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.client.out.vendorDir));
  });

  // inject bower components into index.html
  gulp.task("bowerInject", ["bowerCopy"], () => {
    if (isProd) {
      return gulp.src(config.client.out.index)
        .pipe($.inject(gulp.src([
          config.client.out.vendorDir + "/vendor*.css",
          config.client.out.vendorDir + "/**/ace-builds/**/*ace.js",
          config.client.out.vendorDir + "/vendor*.js",
          config.client.out.vendorDir + "/**/ace-builds/**/mode-**.js"
        ], {
          read: false
        }), {
          starttag: "<!-- bower:{{ext}} -->",
          endtag: "<!-- endbower -->",
          addRootSlash: false,
          ignorePath: config.client.out.root
        }))
        .pipe($.htmlmin({
          collapseWhitespace: true,
          removeComments: true
        }))
        .pipe(gulp.dest(config.client.out.root));
    } else {
      return gulp.src(config.client.out.index)
        .pipe($.wiredep.stream({
          ignorePath: "../../" + config.bowerDir.replace(/\\/g, "/"),
          fileTypes: {
            html: {
              replace: {
                css: (filePath) => {
                  return "<link rel='stylesheet' href='" + config.client.out.vendorDir.replace(config.client.out.root, "") +
                    filePath + "'>";
                },
                js: (filePath) => {
                  return "<script src='" + config.client.out.vendorDir.replace(config.client.out.root, "") +
                    filePath + "'></script>";
                }
              }
            }
          }
        }))
        .pipe(gulp.dest(config.client.out.root));
    }
  });

  gulp.task("frontend:build", ["bowerInject"]);

  gulp.task("build", ["node:build", "frontend:build"]);

};
