# Koans
Programming exercises in Typescript and Javascript


# Features
- Creation of exercise series with template code and assertions
- Support for Typescript and Javascript
- Automatic verification of user solution and instant feedback
- Exercise search
- Authentication

# Installation

#### 1. Clone the repository
```
git clone https://github.com/judithgull/koans.git
```

#### 2. MongoDB
###### Install 
See: https://docs.mongodb.org/manual/installation/

Create Data directory
```
mkdir -p /data/db
```
Ensure that the user account running mongod has read and write permissions for the directory.

Test, if db is running: 
```
mongod
```

###### Setup
Add text index (for search) and sample data:

Start mongodb, if not already started:
```
mongod
```
In another terminal:
Move to the project home (location of the cloned repo):
```
cd <path_to_cloned_project>/koans
```
Import sample data:
```
mongoimport --db koans --collection topics app-node/sample-data/topics.bson
```
Add textindex for search:
```
mongo --eval "db.getSiblingDB('koans').topics.createIndex({title: 'text', 'items.title': 'text','items.description': 'text'})"
```

#### 3. Nodejs
Install [Node.js](http://nodejs.org/) (This will also install npm).

#### 4. Dependencies
Move to the project home (location of the cloned repo):
```
cd <path_to_cloned_project>/koans
```

Run `npm install` to install all dependencies. (npm, bower, patched libraries)

#### 5. Run in production mode

Make sure mongodb is running:
```
mongod
```
Run ```npm start``` to start application (in a different terminal)

Open browser with [http://localhost:3000] (http://localhost:3000)

#### 4. Webstorm
1. Use the lates Webstorm 11.x or higher
2. Install Typescript Version >= 1.6.2 in Webstorm: install with npm i -g typescript
3. Add to Webstorm: Preferences/Languages & Frameworks/Typescript
- Compiler version: Use path of globally installed typescript: /usr/local/lib/node_modules/typescript/lib
- Command line options: -p .


#### 6. Run
Run `npm start` to start application

#### 6. Development Tasks
- Run `gulp` to run the build task and setup the development environment
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
- Run `gulp --stage prod` to build files for production

## Maintenance tasks

#### MongoDB
###### Drop
Only if you need to drop the db for any reason use:
```
mongod
(in another terminal)
mongo koans --eval "db.dropDatabase()"
```

