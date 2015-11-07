'use strict';

module.exports = function (gulp, $, config) {
  gulp.task('nodemon', ['build'],function (cb) {

    var started = false;

    return $.nodemon({
      script: config.server
    }).on('start', function () {
      // to avoid nodemon being started multiple times
      // thanks @matthisk
      if (!started) {
        cb();
        started = true;
      }
    });
  });

  gulp.task('watch', ['nodemon', 'node-scripts'], function () {
    $.browserSync({
      proxy: "http://localhost:3000/",
      port: 7000
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch([
      config.appScriptFiles,
      config.appMarkupFiles,
      config.appStyleFiles,
      '!' + config.unitTestFiles], ['browserSync']);

  });

  gulp.task('browserSync', ['build'], function () {
    $.browserSync.reload();
  });
};
