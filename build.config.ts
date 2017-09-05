"use strict";

import * as path from "path";

export const outDir       = "build/";
export const testDir      = path.join(outDir, "test");

// client
export const client:any   = {};

client.root               = "app";
client.assetDir           = path.join(client.root, "assets");
client.assetFiles         = path.join(client.assetDir, "**/*");
client.favicon            = path.join(client.assetDir, "favicon.png");
client.indexFile          = path.join(client.root, "**/index.jade");
client.markupFiles        = path.join(client.root, "**/*.jade");
client.styleFiles         = path.join(client.root, "**/*.scss");
client.scriptFiles        = path.join(client.root, "**/*.ts");
client.unitTestFiles      = path.join(client.root, "**/*_test.ts");

client.out                = {};
client.out.root           = path.join(outDir, "app");
client.out.index          = path.join(client.out.root, "index.html");
client.out.assetDir       = path.join(client.out.root, "assets");
client.out.aceSrc         = path.join(client.out.root, "vendor/ace-builds/src-min-noconflict");
client.out.typings        = path.join(client.out.root, "typescripts");
client.out.jsDir          = path.join(client.out.root, "js");
client.out.jsFiles        = path.join(client.out.jsDir, "**/*.js");
client.out.markupFiles    = path.join(client.out.root, "**/*.html");
client.out.unitTestDir    = path.join(testDir, "app");
client.out.unitTestFiles  = path.join(client.out.unitTestDir, "**/*_test.js");
client.out.directives     = path.join(testDir, "**/*directive.tpl.html");
client.out.vendorDir      = path.join(client.out.root,"vendor");
client.out.styleDir       = path.join(client.out.root, "css");

// server
export const server:any   = {};
server.scriptFiles        = path.join("app-node", "**/*.ts");

server.out                = {};
server.out.root           = path.join(outDir, "app-node");
server.out.app            = path.join(server.out.root, "app.js");


// global
const tsFilter = "**/*.ts";
const clientTsFiles       =  path.join(client.root, tsFilter);
const serverTsFiles       =  path.join("app-node", tsFilter);
const gulpTsFiles         =  path.join("gulp", tsFilter);
const tsLibDir            = path.join("node_modules", "typescript/lib"); // dir of typescript library
const nodeTypesDir        = path.join("node_modules","@types");

export const tsFiles      = [clientTsFiles, serverTsFiles, gulpTsFiles];

export const libFiles     = path.join("lib", "**/*.js");
export const typings      = path.join(nodeTypesDir, "**/*.ts"); // installed typings
export const typingsStd   = path.join(tsLibDir, "lib.d.ts"); // standard library typings
export const tsServicesFiles = path.join(tsLibDir, "typescriptServices.js");
