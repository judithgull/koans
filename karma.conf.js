"use strict";
var config = require("./build.config");
var webpackConfig = require("./webpack.config.js");

module.exports = function(config) {config.set({
  browsers: ["Chrome"],
  frameworks: ["jasmine", "sinon"],
  reporters: ['progress'],
  port: 9876,
  logLevel: config.LOG_INFO,
  autoWatch: true,
  singleRun: false,
  autoWatchBatchDelay: 300,
  webpack: {
    entry: webpackConfig.entry,
    module: webpackConfig.module,
    resolve: webpackConfig.resolve
  },
  
  files: [
        './build/app/js/bundle.js',
        "./node_modules/angular-mocks/angular-mocks.js",
        './app/**/*_test.ts'],
  
  preprocessors: {
        './build/app/js/bundle.js': ['webpack'],      
        './app/**/*_test.ts': ['webpack']
      },
  node: {
        fs: "empty"
      }

})};
