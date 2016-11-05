"use strict";

import * as path from "path";
import * as ts from "gulp-typescript";

var outDir = "build/";

export const config:any = {

  shared: {
    tsFilter: "**/*.ts",
  },

  // app directories
  appDir: "app",
  // node app file
  appNodeDir:"app-node",

  gulpDir: "gulp",

  host: "localhost",
  port: 3000,

  // patches for external libraries
  libDir: "lib",
  nodeModules: "node_modules",
  tsTypingsDir: "typings",

  // unit test directories
  unitTestDir: "app",

  // build test dir
  buildTestDir: outDir + "test/",


  // build directories
  buildDir: outDir + "app/",
  buildNodeDir: outDir + "app-node/",
  buildCss: outDir + "app/css/",
  buildFonts: outDir + "app/assets/fonts/",
  buildJs: outDir + "app/js/",
  buildNodeJs: outDir + "app-node/",
  buildData: outDir + "app/data/",
  extDir: outDir + "app/vendor/",
  extAceDir: outDir + "app/vendor/ace-builds/src-min-noconflict",
  extCss: outDir + "app/vendor/css/",
  extFonts: outDir + "app/vendor/fonts/",
  extJs: outDir + "app/vendor/js/",
  extTs: outDir + "app/typescripts/",
  server: outDir + "app-node/app.js"
};


const tsFilter = "**/*.ts";
const clientTsFiles =  path.join(config.appDir, tsFilter);
const serverTsFiles =  path.join(config.appNodeDir, tsFilter);
const gulpTsFiles =  path.join(config.gulpDir, tsFilter);

const jsFilter = "**/*.js";

export const shared = {
  out: "build"
};

export const client:any = {};

client.assetDir = path.join(config.appDir, "assets");
client.assetFiles = path.join(client.assetDir, "**/*");
client.favicon = path.join(client.assetDir, "favicon.png");

client.out = {};
client.out.root = path.join(shared.out, "app");
client.out.index = path.join(client.out.root, "index.html");
client.out.assetDir = path.join(client.out.root, "assets");

export const global:any = {};
global.tsFiles = [clientTsFiles, serverTsFiles, gulpTsFiles];
global.bowerDir = "bower_components";
global.libFiles = path.join("lib", jsFilter);


config.appFiles = path.join(config.appDir, "**/*");


config.appMarkupFiles = path.join(config.appDir, "**/*.jade");
config.appIndexFile = path.join(config.appDir, "**/index.jade");
config.appScriptFiles = path.join(config.appDir, "**/*.ts");
config.appNodeScriptFiles = path.join(config.appNodeDir, "**/*.ts");

config.appStyleFiles = path.join(config.appDir, "**/*.scss");

config.tsLibDir = path.join(config.nodeModules, "typescript/lib");
config.tsServicesFiles = path.join(config.tsLibDir, "typescriptServices.js");
config.tsLibDTs = path.join(config.tsLibDir, "lib.d.ts");
config.tsTypings = path.join(config.tsTypingsDir, "**/*.ts");



config.buildDirectiveTemplateFiles = path.join(config.buildDir, "**/*directive.tpl.html");
config.buildJsFiles = path.join(config.buildJs, "**/*.js");

config.buildTestDirectiveTemplateFiles = path.join(config.buildTestDir, "**/*directive.tpl.html");
config.buildTestDirectiveTemplatesDir = path.join(config.buildTestDir, "templates");
config.buildUnitTestsDir = path.join(config.buildTestDir, config.unitTestDir);
config.buildUnitTestFiles = path.join(config.buildUnitTestsDir, "**/*_test.js");

config.unitTestFiles = path.join(config.unitTestDir, "**/*_test.ts");
config.nodeUnitTestFiles = path.join(config.appNodeDir, "**/*_test.ts");

config.tsProject = ts.createProject("tsconfig.json");
