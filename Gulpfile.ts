"use strict";

const gulp:any = require("gulp");
const gulpFiles = require("require-dir")("./gulp");


for (let key of Object.keys(gulpFiles)) {
  gulpFiles[key](gulp);
}

gulp.task("dev", ["pre-build"],  ()  => {
  gulp.start("watch");
  gulp.start("mongod");
});

gulp.task("default", ["dev"]);

