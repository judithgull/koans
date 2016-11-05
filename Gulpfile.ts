"use strict";

import {config} from "./build.config";
var gulp:any = require("gulp"),
  gulpFiles = require("require-dir")("./gulp"),
  key,
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

for (key in gulpFiles) {
  gulpFiles[key](gulp, $$, config);
}

gulp.task("dev", ["pre-build"],  ()  => {
  gulp.start("watch");
  gulp.start("mongod");
});

gulp.task("default", ["dev"]);

