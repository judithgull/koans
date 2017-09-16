"use strict";
var config = require("./build.config");
var webpackConfig = require("./webpack.config.js");

module.exports = function(config) {config.set({
  basePath: '',
  browsers: ["PhantomJS"],
  frameworks: ["jasmine", "sinon"],
  reporters: ['progress'],
  port: 9876,
  logLevel: config.LOG_INFO,
  autoWatch: true,
  singleRun: false,
  autoWatchBatchDelay: 300,
  exclude: [
  ],
  webpack: {
    // entry: webpackConfig.entry,
    module: webpackConfig.module,
    resolve: webpackConfig.resolve
  },
  
  files: [
        './app/app-module.ts',
        "./node_modules/angular/angular.js",
        "./node_modules/angular-mocks/angular-mocks.js",
        './app/topic/topic-controller_test.ts',
        './app/topic/exercise/exercise-controller_test.ts',
      ],
  
  preprocessors: {
        './app/app-module.ts': ['webpack'],
        './app/**/*.ts': ['webpack']
      },
  node: {
        fs: "empty"
      }

})};
