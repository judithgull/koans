"use strict";

var _ = require("underscore.string"),
  fs = require("fs"),
  path = require("path"),
  bowerDir = JSON.parse(fs.readFileSync(".bowerrc")).directory + path.sep,
  favicons = require("gulp-favicons");

module.exports = function (gulp, $, config) {
  var isProd = $.yargs.argv.stage === "prod";

  // copy patched libraries into bower_components dir
  gulp.task("patchLibs", function () {
    return gulp.src(config.libFiles)
      .pipe($.filter("**/*.js"))
      .pipe(gulp.dest(bowerDir));
  });

  // delete build directory
  gulp.task("clean", function (cb) {
    return $.del(config.buildDir, cb);
  });

  gulp.task("clean-node", function (cb) {
    return $.del(config.buildNodeDir, cb);
  });

  gulp.task("node-scripts", ["clean-node"], function () {
    var tsFilter = $.filter("**/*.ts");
    return gulp.src(config.appNodeScriptFiles)
      .pipe($.if(!isProd, $.sourcemaps.init()))
      .pipe(tsFilter)
      .pipe($.typescript(config.tsProject))
      .pipe(tsFilter.restore())
      .pipe($.if(!isProd, $.sourcemaps.write(".")))
      .pipe(gulp.dest(config.buildNodeJs))
  });

  // compile markup files and copy into build directory
  gulp.task("markup", ["clean"], function () {
    return gulp.src(config.appMarkupFiles)
      .pipe($.jade())
      .pipe(gulp.dest(config.buildDir));
  });

  // copy data files into build directory
  gulp.task("data", ["clean"], function () {
    return gulp.src(config.appDataFiles)
      .pipe(gulp.dest(config.buildData));
  });

  // compile styles and copy into build directory
  gulp.task("styles", ["clean"], function () {
    return gulp.src(config.appStyleFiles)
      .pipe($.plumber({
        errorHandler: function (err) {
          $.notify.onError({
            title: "Error linting at " + err.plugin,
            subtitle: " ", //overrides defaults
            message: err.message.replace(/\u001b\[.*?m/g, ""),
            sound: " " //overrides defaults
          })(err);

          this.emit("end");
        }
      }))
      .pipe($.sass())
      .pipe($.autoprefixer())
      .pipe($.if(isProd, $.concat("app.css")))
      .pipe($.if(isProd, $.cssmin()))
      .pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.buildCss));
  });


  // compile scripts and copy into build directory
  gulp.task("scripts", ["clean", "analyze", "markup"], function () {
    var htmlFilter = $.filter("**/*.html")
      , jsFilter = $.filter("**/*.js")
      , tsFilter = $.filter("**/*.ts");

    return gulp.src([
        config.appScriptFiles,
        config.buildDir + "**/*.html",
        "!**/*_test.*",
        "!**/index.html"
      ])
      .pipe($.sourcemaps.init())
      .pipe(tsFilter)
      .pipe($.typescript(config.tsProject))
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
      .pipe(gulp.dest(config.buildJs))
      .pipe(jsFilter.restore());
  });

  // inject custom CSS and JavaScript into index.html
  gulp.task("inject", ["markup", "styles", "scripts"], function () {
    var jsFilter = $.filter("**/*.js");

    return gulp.src(config.buildDir + "index.html")
      .pipe($.inject(gulp.src([
          config.buildCss + "**/*",
          config.buildJs + "**/*"
        ])
        .pipe(jsFilter)
        .pipe($.angularFilesort())
        .pipe(jsFilter.restore()), {
          addRootSlash: false,
          ignorePath: config.buildDir
        })
      )
      .pipe(gulp.dest(config.buildDir));
  });

  gulp.task("bowerCopyCss", ["inject"], function () {
    var cssFilter = $.filter("**/*.css");
    return gulp.src($.mainBowerFiles(), {base: bowerDir})
      .pipe(cssFilter)
      .pipe($.if(isProd, $.modifyCssUrls({
        modify: function (url, filePath) {
          if (url.indexOf("http") !== 0 && url.indexOf("data:") !== 0) {
            filePath = path.dirname(filePath) + path.sep;
            filePath = filePath.substring(filePath.indexOf(bowerDir) + bowerDir.length,
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
      .pipe(gulp.dest(config.extDir))
  });

  gulp.task("bowerCopyAce", ["inject"], function () {
    var aceFilter = $.filter("ace-builds/**/*.js");
    return gulp.src($.mainBowerFiles(), {base: bowerDir})
      .pipe(aceFilter)
      .pipe(gulp.dest(config.extDir));
  });

  // copy bower components into build directory
  gulp.task("bowerCopy", ["inject", "bowerCopyCss", "bowerCopyAce"], function () {
    var jsNoAceFilter = $.filter(["**/*.js", "!ace-builds/**"]);
    return gulp.src($.mainBowerFiles(), {base: bowerDir})
      .pipe(jsNoAceFilter)
      .pipe($.if(isProd, $.concat("vendor.js")))
      .pipe($.if(isProd, $.uglify({
        preserveComments: $.uglifySaveLicense
      })))
      .pipe($.if(isProd, $.rev()))
      .pipe(gulp.dest(config.extDir));
  });

  // copy typescriptServices from node_modules into build directory
  gulp.task("copyTsServices", ["clean", "bowerCopy"], function () {
    return gulp.src(config.tsServicesFiles)
      .pipe(gulp.dest(config.extAceDir));
  });


  // copy typescripts/lib.d.ts to build directory
  gulp.task("copyTypeDefinitions", ["clean", "bowerCopy"], function () {
    return gulp.src([config.tsLibDTs, config.tsTypings])
      .pipe(gulp.dest(config.extTs));
  });

  // inject bower components into index.html
  gulp.task("bowerInject", ["copyTsServices", "copyTypeDefinitions"], function () {
    if (isProd) {
      return gulp.src(config.buildDir + "index.html")
        .pipe($.inject(gulp.src([
          config.extDir + "vendor*.css",
          config.extDir + "**/ace-builds/**/*ace.js",
          config.extDir + "vendor*.js",
          config.extDir + "**/ace-builds/**/mode-**.js"
        ], {
          read: false
        }), {
          starttag: "<!-- bower:{{ext}} -->",
          endtag: "<!-- endbower -->",
          addRootSlash: false,
          ignorePath: config.buildDir
        }))
        .pipe($.htmlmin({
          collapseWhitespace: true,
          removeComments: true
        }))
        .pipe(gulp.dest(config.buildDir));
    } else {
      return gulp.src(config.buildDir + "index.html")
        .pipe($.wiredep.stream({
          ignorePath: "../../" + bowerDir.replace(/\\/g, "/"),
          fileTypes: {
            html: {
              replace: {
                css: function (filePath) {
                  return "<link rel='stylesheet' href='" + config.extDir.replace(config.buildDir, "") +
                    filePath + "'>";
                },
                js: function (filePath) {
                  return "<script src='" + config.extDir.replace(config.buildDir, "") +
                    filePath + "'></script>";
                }
              }
            }
          }
        }))
        .pipe(gulp.dest(config.buildDir));
    }
  });

  // copy custom fonts into build directory
  gulp.task("fonts", ["clean"], function () {
    var fontFilter = $.filter("**/*.{eot,otf,svg,ttf,woff}");
    return gulp.src([config.appFontFiles])
      .pipe(fontFilter)
      .pipe(gulp.dest(config.buildFonts))
      .pipe(fontFilter.restore());
  });

  // copy and optimize images into build directory
  gulp.task("assets", ["clean"], function () {
    return gulp.src(config.appAssetsFiles)
      .pipe($.if(isProd, $.imagemin()))
      .pipe(gulp.dest(config.buildAssets));
  });

  gulp.task("copyTemplates", ["bowerInject"], function () {
    // always copy templates to testBuild directory
    var stream = $.streamqueue({objectMode: true});

    stream.queue(gulp.src([config.buildDirectiveTemplateFiles]));

    return stream.done()
      .pipe(gulp.dest(config.buildTestDirectiveTemplatesDir));
  });

  gulp.task("favicons", function () {
    gulp.src(config.faviconFiles).pipe(favicons({
      display: "standalone",
      orientation: "portrait",
      version: 1.0,
      logging: false,
      online: false,
      html: "./build/app/index.html"
    })).pipe(gulp.dest("./build/app"));
  });

  gulp.task("build-frontend", ["copyTemplates", "favicons", "assets", "fonts", "data"]);

  gulp.task("build", ["node-scripts", "build-frontend"]);

};
