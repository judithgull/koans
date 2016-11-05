"use strict";

import * as tslint from "gulp-tslint";
import {global} from "../build.config";

module.exports = (gulp) => {

  gulp.task("analyze", () => {
    return gulp.src(global.tsFiles)
      .pipe(tslint())
      .pipe(tslint.report());
  });
};

