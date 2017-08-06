"use strict";


import * as tslint from "gulp-tslint";
import * as config from "../build.config";

module.exports = (gulp) => {
  gulp.task("analyze", () => {
    return gulp.src(config.tsFiles)
      .pipe(tslint())
      .pipe(tslint.report());
  });
};

