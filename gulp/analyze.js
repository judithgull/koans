"use strict";

module.exports = function (gulp, $, config) {

  gulp.task("lint", function () {
    return gulp.src([config.appScriptFiles, config.appNodeScriptFiles])
      .pipe($.tslint())
      .pipe($.tslint.report("verbose"));
  });

  gulp.task("analyze", ["lint"]);
};
