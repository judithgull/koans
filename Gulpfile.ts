import * as gulp from 'gulp';
import * as del from 'del';
import * as config from './build.config';
import * as streamqueue from 'streamqueue';
import * as exec from 'gulp-exec';
import * as webpack from 'webpack-stream';
import * as webpackconfig from './webpack.config';

// clean all
gulp.task('clean', () => del(config.client.out.root));

// copy typescripts/lib.d.ts to build directory
gulp.task('pre-build', ['copy-js'], () => {
  return gulp
    .src([config.typingsStd, config.typings])
    .pipe(gulp.dest(config.client.out.typings));
});

// copy executable js files to build directory
gulp.task('copy-js', () => {
  return gulp.src(config.chai).pipe(gulp.dest(config.client.out.jsLibs));
});

gulp.task('analyze', () => {
  // return gulp.src(config.tsFiles)
  //   .pipe(tslint())
  //   .pipe(tslint.report());
});

// compile scripts and copy into build directory
gulp.task('scripts', () => {
  return gulp
    .src(config.client.scriptEntry)
    .pipe(webpack(webpackconfig))
    .pipe(gulp.dest(config.client.out.root));
});

const runCommand = command => {
  return cb => {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  };
};

// export current db
gulp.task(
  'mongo-export',
  runCommand(
    'mongoexport --db koans --collection topics --out app-node/sample-data/topics.bson'
  )
);

gulp.task('build', ['scripts']);

gulp.task('default', ['build']);
