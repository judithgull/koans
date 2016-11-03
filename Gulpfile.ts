"use strict";

import {buildConfig} from "./build.config";
var __:any = require("lodash");
var gulp:any = require("gulp"),
  gulpFiles = require("require-dir")("./gulp"),
  path = require("path"),
  key,
  $$:any = require("gulp-load-plugins")({
  pattern: [
    "browser-sync",
    "del",
    "gulp-*",
    "karma",
    "main-bower-files",
    "multi-glob",
    "run-sequence",
    "streamqueue",
    "uglify-save-license",
    "wiredep",
    "yargs",
    "nodemon"
  ]
  }),
  config:any = {};

__.merge(config, buildConfig);

config.appFiles = path.join(config.appDir, "**/*");
config.faviconFiles = path.join(config.appDir, "assets/favicon.png");
config.appAssetsFiles = path.join(config.appDir, "assets/**/*");
config.appMarkupFiles = path.join(config.appDir, "**/*.jade");
config.appIndexFile = path.join(config.appDir, "**/index.jade");
config.appScriptFiles = path.join(config.appDir, "**/*.ts");
config.appNodeScriptFiles = path.join(config.appNodeDir, "**/*.ts");

config.appStyleFiles = path.join(config.appDir, "**/*.scss");

config.tsLibDir = path.join(config.nodeModules, "typescript/lib");
config.tsServicesFiles = path.join(config.tsLibDir, "typescriptServices.js");
config.tsLibDTs = path.join(config.tsLibDir, "lib.d.ts");
config.tsTypings = path.join(config.tsTypingsDir, "**/*.ts");

config.libFiles = path.join(config.libDir, "**/*.js");

config.buildDirectiveTemplateFiles = path.join(config.buildDir, "**/*directive.tpl.html");
config.buildJsFiles = path.join(config.buildJs, "**/*.js");

config.buildTestDirectiveTemplateFiles = path.join(config.buildTestDir, "**/*directive.tpl.html");
config.buildTestDirectiveTemplatesDir = path.join(config.buildTestDir, "templates");
config.buildUnitTestsDir = path.join(config.buildTestDir, config.unitTestDir);
config.buildUnitTestFiles = path.join(config.buildUnitTestsDir, "**/*_test.js");

config.unitTestFiles = path.join(config.unitTestDir, "**/*_test.ts");
config.nodeUnitTestFiles = path.join(config.appNodeDir, "**/*_test.ts");

config.tsProject = $$.typescript.createProject("tsconfig.json");

for (key in gulpFiles) {
  gulpFiles[key](gulp, $$, config);
}

gulp.task("dev", ["pre-build"],  ()  => {
  gulp.start("watch");
  gulp.start("mongod");
});

gulp.task("default", ["dev"]);
