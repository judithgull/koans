import * as path from "path";

export const outDir       = "build/";

// client
export const client:any   = {};
client.root               = "app";
client.scriptEntry        = path.join(client.root, "app-module.ts");

client.out                = {};
client.out.root           = path.join(outDir, "app");
client.out.typings        = path.join(client.out.root, "typescripts");

// global
const tsLibDir            = path.join("node_modules", "typescript/lib"); // dir of typescript library
const nodeTypesDir        = path.join("node_modules","@types");

export const libFiles     = path.join("lib", "**/*.js");
export const typings      = path.join(nodeTypesDir, "**/*.ts"); // installed typings
export const typingsStd   = path.join(tsLibDir, "lib.d.ts"); // standard library typings
export const tsServicesFiles = path.join(tsLibDir, "typescriptServices.js");
