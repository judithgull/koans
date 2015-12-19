# Koans
Programming exercises in Typescript and Javascript


# Features
- Creation of exercise series with template code and assertions
- Support for Typescript and Javascript
- Automatic verification of user solution and instant feedback
- Exercise search
- Authentication

# Installation

#### 1. MongoDB
###### Install 
Install with brew on OSX: https://docs.mongodb.org/manual/installation/

###### Setup
Add text index (for search) and sample data:
```
mongod
(in another terminal)
mongoimport --db koans --collection topics app-node/sample-data/topics.bson
mongo --eval "db.getSiblingDB('koans').topics.createIndex({title: 'text', 'items.title': 'text','items.description': 'text'})"
```

###### Drop
Only if you need to drop it for any reason use:
```
mongod
(in another terminal)
mongo koans --eval "db.dropDatabase()"
```

#### 2. Nodejs
Install [Node.js](http://nodejs.org/) (This will also install npm).

#### 3. Webstorm
1. Use the lates Webstorm 11.x or higher
2. Install Typescript Version >= 1.6.2 in Webstorm: install with npm i -g typescript
3. Add to Webstorm: Preferences/Languages & Frameworks/Typescript
- Compiler version: Use path of globally installed typescript: /usr/local/lib/node_modules/typescript/lib
- Command line options: -p .

#### 4. Install Dependencies
Run `npm install` to install all dependencies. (npm, bower, patched libraries)

#### 5. Run
Run `npm start` to start application

#### 6. Development Tasks
- Run `gulp` to run the build task and setup the development environment
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
- Run `gulp --stage prod` to build files for production
