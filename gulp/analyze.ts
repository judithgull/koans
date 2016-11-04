"use strict";

import * as tslint from "gulp-tslint";

module.exports = function (gulp, _$, config) {

  gulp.task("lint", () =>  {
    return gulp.src([config.appScriptFiles, config.appNodeScriptFiles])
      .pipe(tslint())
      .pipe(tslint.report());
  });

  gulp.task("analyze", ["lint"]);
};

