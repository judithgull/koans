"use strict";

import * as del from "del";
import {global, client, server} from "../build.config";

const favicons = require("gulp-favicons");
const imagemin = require("gulp-imagemin");
const jade = require("gulp-jade");

module.exports = (gulp, $) => {
  var isProd = $.yargs.argv.stage === "prod";

  // copy patched libraries into bower_components dir
  gulp.task("patchLibs", () =>
    gulp.src(global.libFiles)
      .pipe(gulp.dest(global.bowerDir))
  );

  // clean
  gulp.task("clean", (done) => del(client.out.root, done));

  gulp.task("node:clean", (done) => del(server.out.root, done));

  // copy and optimize images into build directory
  gulp.task("assets", ["clean"],  () =>
    gulp.src(client.assetFiles)
      .pipe($.if(isProd, imagemin()))
      .pipe(gulp.dest(client.out.assetDir))
  );

  // copy current typescriptServices from node_modules into build directory
  gulp.task("copyTsServices", ["clean"], () =>
    gulp.src(global.tsServicesFiles)
      .pipe(gulp.dest(client.out.aceSrc))
  );

  // copy typescripts/lib.d.ts to build directory
  gulp.task("copyTypeDefinitions", ["clean"],  () => {
    return gulp.src([global.typingsStd, global.typings])
      .pipe(gulp.dest(client.out.typings));
  });

  // compile index.jade and copy into build directory
  gulp.task("index", ["clean"],  () =>
    gulp.src(client.indexFile)
      .pipe(jade())
      .pipe(gulp.dest(client.out.root))
  );

  // copy and favicons and add to index.html
  gulp.task("favicons", ["index", "clean"], () => {
    gulp.src(client.favicon).pipe(favicons({
      display: "standalone",
      orientation: "portrait",
      version: 1.0,
      logging: false,
      online: false,
      html: client.out.index
    })).pipe(gulp.dest(client.out.root));
  });

  gulp.task("pre-build", ["assets", "favicons", "copyTsServices", "copyTypeDefinitions", "node:clean"]);

};
