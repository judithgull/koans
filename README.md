# koans

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.10.0) version 0.10.0*

## Setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.10.0`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## MongoDB
- Install MongoDB
```
brew install mongodb
```
###Instructions:
http://docs.mongodb.org/manual/installation/

## Webstorm
1. Install Typescript Version >= 1.6.2 in Webstorm: install with npm i -g typescript
2. Add to Webstorm: Preferences/Languages & Frameworks/Typescript
- Compiler version: Use path of globally installed typescript: /usr/local/lib/node_modules/typescript/lib
- Command line options: -p .
3. Use Webstorm 10.0.4 or higher

## Type Definition
- Run `tsd install` to install type definition files

## Gulp tasks
- Run `gulp` to run the build task and setup the development environment
- Run `gulp --resetdb=true` to reset the database with example data and start the dev environment
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
- Run `gulp --stage prod` to build files for production

