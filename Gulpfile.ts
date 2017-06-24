"use strict";

var gulp:any = require("gulp"),
  gulpFiles = require("require-dir")("./gulp"),
  $$:any = require("gulp-load-plugins")({
  pattern: [
    "browser-sync",
    "gulp-*",
    "karma",
    "main-bower-files",
    "multi-glob",
    "run-sequence",
    "streamqueue",
    "uglify-save-license",
    "wiredep",
    "yargs",
    "nodemon"
  ]
  });

for (let key of Object.keys(gulpFiles)) {
  gulpFiles[key](gulp, $$);
}

gulp.task("dev", ["pre-build"],  ()  => {
  gulp.start("watch");
  gulp.start("mongod");
});

gulp.task("default", ["dev"]);

