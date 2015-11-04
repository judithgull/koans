'use strict';

var exec = require('child_process').exec;
var run = require('gulp-run');


module.exports = function (gulp, $) {
  var isResetDb = $.yargs.argv.resetdb === 'true';

  function runCommand(command) {
    return function (cb) {
      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    }
  }

  gulp.task('mongod', function () {
    var f = runCommand('mongod');
    f(function (err) {
      if (err) {
        console.log("Error in mongod");
        console.log(err);
        gulp.start('stop-mongo');
        gulp.start();
      }
    });
  });

  gulp.task('stop-mongo', runCommand('mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()"'));

  //export current db
  gulp.task('mongo-export', runCommand('mongoexport --db koans --collection topics --out app-node/sample-data/topics.bson'));


  gulp.task('drop-mongo', function(){
    run('mongo koans --eval "db.dropDatabase()"').exec();
  });

  gulp.task('reset-db', function(){
    if(isResetDb) {
      gulp.start('drop-mongo');
      run('mongoimport --db koans --collection topics app-node/sample-data/topics.bson').exec();
    }
  });

};
