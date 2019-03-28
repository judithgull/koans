[![Build Status](https://travis-ci.org/judithgull/koans.svg?branch=master)](https://travis-ci.org/judithgull/koans)

# A Platform for Programming Exercises in TypeScript

[https://ilovecode.herokuapp.com/](https://ilovecode.herokuapp.com/)

# Features

- Creation of exercise series with template code and assertions
- Automatic verification of user solution and instant feedback

# Technology Stack

- [Angular](https://angular.io/)
- [Sass (SCSS)](http://sass-lang.com/)
- [NodeJs](https://nodejs.org/)
- [MongoDb](https://www.mongodb.org/)
- [Typescript](http://www.typescriptlang.org/)
- [Gulp](http://gulpjs.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth/)

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

In a different terminal:
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

Run `npm install` to install all dependencies. (npm, patched libraries)

#### 5. Environment Settings

- Create a firebase project (for handling users and authentication): https://console.firebase.google.com/
- Open develop/authentication and activate google authentication
- Copy the properties to environments/environment.ts and fill in firebase properties

#### 6. Run

Make sure mongodb is running:

```
mongod
```

Run `npm start` to start application (in a different terminal)

Open browser with [http://localhost:4200](http://localhost:4200)

# Development

## Maintenance tasks

#### MongoDB

###### Drop

Only if you need to drop the db for any reason use:

Make sure db is started:

```
mongod
```

(in a different terminal)

```
mongo koans --eval "db.dropDatabase()"
```
