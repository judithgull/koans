'use strict';

var _ = require('lodash')
  , buildConfig = require('./build.config')
  , config = {}
  , gulp = require('gulp')
  , gulpFiles = require('require-dir')('./gulp')
  , path = require('path')
  , $, key;

$ = require('gulp-load-plugins')({
  pattern: [
  'browser-sync',
  'del',
  'gulp-*',
  'karma',
  'main-bower-files',
  'multi-glob',
  'plato',
  'run-sequence',
  'streamqueue',
  'uglify-save-license',
  'wiredep',
  'yargs'
  ]
});

_.merge(config, buildConfig);

config.appFiles = path.join(config.appDir, '**/*');
config.appFontFiles = path.join(config.appDir, 'fonts/**/*');
config.appImageFiles = path.join(config.appDir, 'images/**/*');
config.appMarkupFiles = path.join(config.appDir, '**/*.jade');
config.appScriptFiles = path.join(config.appDir, '**/*.ts');
config.appStyleFiles = path.join(config.appDir, '**/*.scss');
config.appDataFiles = path.join(config.appDir, 'data/**/*.json');

config.libFiles = path.join(config.libDir, '**/*.js');
config.tsFiles = path.join(config.typescriptsDir, '**/*.ts');

config.buildDirectiveTemplateFiles = path.join(config.buildDir, '**/*directive.tpl.html');
config.buildJsFiles = path.join(config.buildJs, '**/*.js');

config.buildTestDirectiveTemplateFiles = path.join(config.buildTestDir, '**/*directive.tpl.html');
config.buildE2eTestsDir = path.join(config.buildTestDir, 'e2e');
config.buildE2eTests = path.join(config.buildE2eTestsDir, '**/*_test.js');
config.buildTestDirectiveTemplatesDir = path.join(config.buildTestDir, 'templates');
config.buildUnitTestsDir = path.join(config.buildTestDir, config.unitTestDir);
config.buildUnitTestFiles = path.join(config.buildUnitTestsDir, '**/*_test.js');

config.e2eFiles = path.join('e2e', '**/*.js');
config.unitTestFiles = path.join(config.unitTestDir, '**/*_test.ts');

config.tsProject = $.typescript.createProject({
  declarationFiles: true,
  noExternalResolve: false
});

for (key in gulpFiles) {
  gulpFiles[key](gulp, $, config);
}

gulp.task('dev', ['build'], function () {
  gulp.start('browserSync');
  gulp.start('watch');
});

gulp.task('default', ['dev']);
