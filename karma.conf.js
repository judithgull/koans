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
  autoWatch: webpackConfig.isDevelopment,
  singleRun: !webpackConfig.isDevelopment,
  autoWatchBatchDelay: 300,
  exclude: [
  ],
  webpack: {
    module: webpackConfig.module,
    resolve: webpackConfig.resolve
  },
  
  files: [
        './app/app-module.ts',
        "./node_modules/angular/angular.js",
        "./node_modules/angular-mocks/angular-mocks.js",
        './app/**/*_test.ts'
      ],
  
  preprocessors: {
        './app/**/*.ts': ['webpack']
      },
  node: {
        fs: "empty"
      }

})};
