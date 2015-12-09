# koans

## MongoDB
- Install MongoDB
```
brew install mongodb
```
###Instructions:
http://docs.mongodb.org/manual/installation/

###Setup Database: Add sample data and text
```
mongod
(in another terminal)
mongoimport --db koans --collection topics app-node/sample-data/topics.bson
mongo --eval "db.getSiblingDB('koans').topics.createIndex({title: 'text', 'items.title': 'text','items.description': 'text'})"
```

###Drop Database:
```
mongod
(in another terminal)
mongo koans --eval "db.dropDatabase()"
```

## Setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
2. Run `bower install` to install client-side dependencies
3. Run `npm start` to start application in production mode


## Webstorm
1. Install Typescript Version >= 1.6.2 in Webstorm: install with npm i -g typescript
2. Add to Webstorm: Preferences/Languages & Frameworks/Typescript
- Compiler version: Use path of globally installed typescript: /usr/local/lib/node_modules/typescript/lib
- Command line options: -p .
3. Use Webstorm 10.0.4 or higher

## Gulp tasks
- Run `gulp` to run the build task and setup the development environment
- Run `gulp --resetdb=true` to reset the database with example data and start the dev environment
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
- Run `gulp --stage prod` to build files for production

