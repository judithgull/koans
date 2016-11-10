"use strict";
import * as del from "del";
import * as config from "../build.config";
import * as ts from "gulp-typescript";

var karmaConf = require("../karma.config");
var gulpFilter = require("gulp-filter");

karmaConf.files = [];

module.exports = (gulp, $) => {

  gulp.task("clean:test", (cb) => {
    return del(config.testDir, cb);
  });

  gulp.task("buildTests", ["clean:test", "build"], () => {
    var testFilter = gulpFilter("**/*_test.js");
    const tsProject = ts.createProject("tsconfig.json");
    return gulp.src([
      config.client.unitTestFiles,
      config.client.scriptFiles
    ])
      .pipe($.typescript(tsProject))
      .pipe(testFilter)
      .pipe(gulp.dest(config.client.out.unitTestDir));
  });

  // inject scripts in karma.config.js
  gulp.task("karmaFiles", ["buildTests"], () => {
    var stream = $.streamqueue({objectMode: true});

    // add bower javascript
    stream.queue(gulp.src($.wiredep({
      devDependencies: true
    }).js));

    // add application templates
    stream.queue(gulp.src([config.client.out.directives]));

    // add application javascript
    stream.queue(gulp.src([
      config.client.out.jsFiles,
      "!**/*_test.*"
    ])
      .pipe($.angularFilesort()));

    // add unit tests
    stream.queue(gulp.src([config.client.out.unitTestFiles]));

    return stream.done()
      .on("data", (file) => {
        karmaConf.files.push(file.path);
      });
  });

  // run unit tests
  gulp.task("unitTest", ["karmaFiles"], (done) => {
    $.karma.server.start(karmaConf, (exitCode) => {
      console.log("Karma has exited with " + exitCode);
      done(exitCode);
    });
  });

};
