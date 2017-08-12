"use strict";

import * as del from "del";
import * as config from "../build.config";
import * as g$if from "gulp-if";

const favicons = require("gulp-favicons");
const imagemin = require("gulp-imagemin");
const pug = require("gulp-pug");
const yargs = require("yargs");

module.exports = (gulp) => {
  var isProd = yargs.argv.stage === "prod";
  // copy patched libraries into node_modules dir
  gulp.task("patchLibs", () =>
  gulp.src(config.libFiles)
    .pipe(gulp.dest("node_modules"))
);
  // clean
  gulp.task("clean", (done) => del(config.client.out.root, done));

  gulp.task("node:clean", (done) => del(config.server.out.root, done));

  // copy and optimize images into build directory
  gulp.task("assets", ["clean"],  () =>
    gulp.src(config.client.assetFiles)
      .pipe(g$if(isProd, imagemin()))
      .pipe(gulp.dest(config.client.out.assetDir))
  );

  // copy current typescriptServices from node_modules into build directory
  gulp.task("copyTsServices", ["clean"], () =>
    gulp.src(config.tsServicesFiles)
      .pipe(gulp.dest(config.client.out.aceSrc))
  );

  // copy typescripts/lib.d.ts to build directory
  gulp.task("copyTypeDefinitions", ["clean"],  () => {
    return gulp.src([config.typingsStd, config.typings])
      .pipe(gulp.dest(config.client.out.typings));
  });

  // compile index.jade and copy into build directory
  gulp.task("index", ["clean"],  () =>
    gulp.src(config.client.indexFile)
      .pipe(pug())
      .pipe(gulp.dest(config.client.out.root))
  );

  // copy and favicons and add to index.html
  gulp.task("favicons", ["index", "clean"], () => {
    gulp.src(config.client.favicon).pipe(favicons({
      display: "standalone",
      orientation: "portrait",
      version: 1.0,
      logging: false,
      online: false,
      html: config.client.out.index
    })).pipe(gulp.dest(config.client.out.root));
  });

  gulp.task("pre-build", ["assets", "favicons", "copyTsServices", "copyTypeDefinitions", "node:clean"]);

};
