"use strict";

var outDir = "build/";

export const buildConfig:any = {
  host: "localhost",
  port: 3000,

  // app directories
  appDir: "app",
  //node app file
  appNodeDir:"app-node",

  //patches for external libraries
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
  buildAssets: outDir + "app/assets/",
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
