"use strict";

module.exports = function (gulp, $, config) {
  // lint source code
  gulp.task("lint", function () {
    return gulp.src([config.appScriptFiles,config.appNodeScriptFiles])
      .pipe($.tslint())
      .pipe($.tslint.report("verbose"));
  });
  // run plato anaylysis on JavaScript (ES5) files
  gulp.task("staticAnalysis");
  /*  gulp.task("staticAnalysis", function (done) {
   $.multiGlob.glob([config.appScriptFiles, config.e2eFiles, config.unitTestFiles], function (err, matches) {
   if (err) {
   throw new Error("Couldn\"t find files.");
   }

   // only inspect JS (ES5) files
   matches = matches.filter(function (file) {
   return file.match(/.*[.]js/);
   });

   if (matches.length > 0) {
   $.plato.inspect(matches, "./report", {}, function () {
   done();
   });
   } else {
   done();
   }
   });
   });
   */
  // gulp.task("analyze", ["lint", "staticAnalysis"]); //TODO
  gulp.task("analyze", ["lint", "staticAnalysis"]);
};
