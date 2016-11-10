"use strict";

import * as config from "../build.config";

module.exports = function (gulp, $) {

  // use nodemon to watch node server
  gulp.task("nodemon", ["build"], function (cb) {
    var started = false;

    return $.nodemon({
      script: config.server.out.app
    }).on("start", function () {
      // to avoid nodemon being started multiple times
      if (!started) {
        cb();
        started = true;
      }
    });
  });


  gulp.task("browserSync", ["frontend:build"], function () {
    $.browserSync.reload();
  });

  // watch frontend/backend
  gulp.task("watch", ["nodemon", "node:build"], function () {
    $.browserSync({
      proxy: "http://localhost:3000/",
      port: 7000
    });
    gulp.watch([
      config.client.scriptFiles,
      config.client.markupFiles,
      config.client.styleFiles,
      "!" + config.client.unitTestFiles], ["browserSync"]);
  });

};
