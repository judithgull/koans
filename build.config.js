'use strict';

var outDir = 'build/';

module.exports = {
  host: 'localhost',
  port: 3000,

  // app directories
  appDir: 'app',
  //node app file
  server: 'app-node/app.js',

  //patches for external libraries
  libDir: 'lib',
  nodeModules: 'node_modules',
  tsTypingsDir: 'typings',

  // unit test directories
  unitTestDir: 'app',

  // build test dir
  buildTestDir: outDir + 'test/',

  // build directories
  buildDir: outDir + 'app/',
  buildCss: outDir + 'app/css/',
  buildFonts: outDir + 'app/fonts/',
  buildImages: outDir + 'app/images/',
  buildJs: outDir + 'app/js/',
  buildData: outDir + 'app/data/',
  extDir: outDir + 'app/vendor/',
  extAceDir: outDir + "app/vendor/ace-builds/src-min-noconflict",
  extCss: outDir + 'app/vendor/css/',
  extFonts: outDir + 'app/vendor/fonts/',
  extJs: outDir + 'app/vendor/js/',
  extTs: outDir + 'app/typescripts/'
};
