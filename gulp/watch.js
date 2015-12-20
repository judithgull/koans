"use strict";

module.exports = function (gulp, $, config) {

  //use nodemon to watch node server
  gulp.task("nodemon", ["build"], function (cb) {
    var started = false;

    return $.nodemon({
      script: config.server
    }).on("start", function () {
      // to avoid nodemon being started multiple times
      if (!started) {
        cb();
        started = true;
      }
    });
  });


  gulp.task("browserSync", ["build-frontend"], function () {
    $.browserSync.reload();
  });

  //watch frontend/backend
  gulp.task("watch", ["nodemon", "node-scripts"], function () {
    $.browserSync({
      proxy: "http://localhost:3000/",
      port: 7000
    });
    gulp.watch([
      config.appScriptFiles,
      config.appMarkupFiles,
      config.appStyleFiles,
      "!" + config.unitTestFiles], ["browserSync"]);
  });

};
