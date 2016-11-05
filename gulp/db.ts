"use strict";

var exec = require("child_process").exec;

module.exports = function (gulp, $) {

  function runCommand(command) {
    return function (cb) {
      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    }
  }

  gulp.task("mongod", function () {
    var f = runCommand("mongod");
    f(function (err) {
      if (err) {
        console.log("Error in mongod. Already started?");
        console.log(err);
      }
    });
  });

  gulp.task("stop-mongo", runCommand("mongo --eval 'db.getSiblingDB(\"admin\").shutdownServer()'"));

  // export current db
  gulp.task("mongo-export", runCommand("mongoexport --db koans --collection topics --out app-node/sample-data/topics.bson"));

};
