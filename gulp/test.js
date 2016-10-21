"use strict";

var karmaConf = require("../karma.config.js");
var gulpFilter = require("gulp-filter");

karmaConf.files = [];

module.exports = function (gulp, $, config) {

  gulp.task("clean:test", function (cb) {
    return $.del(config.buildTestDir, cb);
  });

  gulp.task("buildTests", ["clean:test", "build"], function () {
    var testFilter = gulpFilter("**/*_test.js");
    return gulp.src([
        config.unitTestFiles,
        config.appScriptFiles
      ])
      .pipe($.typescript(config.tsProject))
      .pipe(testFilter)
      .pipe(gulp.dest(config.buildUnitTestsDir));
  });

  // inject scripts in karma.config.js
  gulp.task("karmaFiles", ["buildTests"], function () {
    var stream = $.streamqueue({objectMode: true});

    // add bower javascript
    stream.queue(gulp.src($.wiredep({
      devDependencies: true
    }).js));

    // add application templates
    stream.queue(gulp.src([config.buildTestDirectiveTemplateFiles]));

    // add application javascript
    stream.queue(gulp.src([
        config.buildJsFiles,
        "!**/*_test.*"
      ])
      .pipe($.angularFilesort()));

    // add unit tests
    stream.queue(gulp.src([config.buildUnitTestFiles]));

    return stream.done()
      .on("data", function (file) {
        karmaConf.files.push(file.path);
      });
  });

  // run unit tests
  gulp.task("unitTest", ["karmaFiles"], function (done) {
    $.karma.server.start(karmaConf, function (exitCode) {
      console.log("Karma has exited with " + exitCode);
      done(exitCode);
    });
  });

  gulp.task("build:e2eTest", function () {
    return gulp.src([config.e2eFiles])
      .pipe(gulp.dest(config.buildE2eTestsDir));
  });

  // run e2e tests - SERVER MUST BE RUNNING FIRST
  gulp.task("e2eTest", ["build:e2eTest"], function () {
    return gulp.src(config.buildE2eTests)
      .pipe($.protractor.protractor({
        configFile: "protractor.config.js"
      }))
      .on("error", function (e) {
        console.log(e);
      });
  });

  gulp.task("webdriverUpdate", $.protractor.webdriver_update);
};
