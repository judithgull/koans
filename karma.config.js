"use strict";
var config = require("./build.config"),
  preprocessors = {},
  buildTestDir, templateDir
  , jsDir;

buildTestDir = config.testDir;
// add slash if missing to properly strip prefix from directive templates
if (buildTestDir[buildTestDir.length - 1] !== "/") {
  buildTestDir = buildTestDir + "/";
}
templateDir = buildTestDir + "templates/";

jsDir = config.client.out.jsDir;
// add slash if missing to properly strip prefix from directive templates
if (jsDir[jsDir.length - 1] !== "/") {
  jsDir = jsDir + "/";
}

preprocessors[templateDir + "**/*-directive.tpl.html"] = ["ng-html2js"];

module.exports = {
  browsers: ["PhantomJS"],
  frameworks: ["jasmine", "sinon"],
  reporters: ["html", "failed"],
  preprocessors: preprocessors,
  ngHtml2JsPreprocessor: {
    stripPrefix: templateDir
  },
  autoWatch: false,
  singleRun: true
};
