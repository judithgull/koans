[![Build Status](https://travis-ci.org/judithgull/koans.svg?branch=master)](https://travis-ci.org/judithgull/koans)

# A Platform for Programming Exercises in TypeScript

[https://ilovecode.herokuapp.com/](https://ilovecode.herokuapp.com/)

# Features

- Creation of exercise series with template code and assertions
- Automatic verification of user solution and instant feedback

# Technology Stack

- [Angular](https://angular.io/)
- [Sass (SCSS)](http://sass-lang.com/)
- [Typescript](http://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/docs/)

# Installation

#### 1. Clone the repository

```
git clone https://github.com/judithgull/koans.git
```

###### Setup

#### 2. Dependencies

Move to the project home (location of the cloned repo):

```
cd <path_to_cloned_project>/koans
```

Run `npm install` to install all dependencies. (npm, patched libraries)

#### 5. Environment Settings

- Create a firebase project: https://console.firebase.google.com/
- Open develop/authentication and activate google authentication
- Copy the properties to environments/environment.ts and fill in firebase properties

#### 6. Run

Run `npm start` to start application (in a different terminal)

Open browser with [http://localhost:4200](http://localhost:4200)
