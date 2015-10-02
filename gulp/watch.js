'use strict';

module.exports = function (gulp, $, config) {
  gulp.task('browserSync', function () {
    $.browserSync({
      host: config.host,
      open: 'external',
      port: config.port,
      server: {
        baseDir: config.buildDir
      }
    });
  });

  gulp.task('watch', function () {
    $.browserSync.reload();
    gulp.watch([config.unitTestFiles], ['unitTest']);
    gulp.watch([
      config.appScriptFiles,
      config.appMarkupFiles,
      config.appStyleFiles,
      '!' + config.unitTestFiles], ['build', $.browserSync.reload]);
  });
};
