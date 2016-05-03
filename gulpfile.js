var gulp = require('gulp')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , sourcemaps = require('gulp-sourcemaps')
  , rename = require('gulp-rename')
  , clean = require('gulp-clean')
  , usemin = require('gulp-usemin')
  , cssmin = require('gulp-cssmin')
  , livereload = require('gulp-livereload')
  , ghPages = require('gulp-gh-pages')
  , runSequence = require('run-sequence')
  , babel = require('gulp-babel')
  , eslint = require('gulp-eslint')

// Watch Our Files
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*', ['build']).on('change', livereload.changed)
    //gulp.watch('dist/**/*').on('change', livereload.changed)
});


gulp.task('babel', function() {
    return gulp.src('src/client/js/app.es6.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('src/client/js'))
})

gulp.task('usemin', function() {
    return gulp.src('src/index.html')
        .pipe(usemin({
            //assetsDir: 'images',
            css: [cssmin(), 'concat'],
            js: [uglify(), 'concat']
        }))
        .pipe(gulp.dest('dist'));
});

// copy images to dist/
gulp.task('copyfiles', function() {
    gulp.src('src/client/images/**')
    .pipe(gulp.dest('dist/client/images'));
});

gulp.task('lint', function () {
    return gulp.src(['src/client/*.es6.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

// Concat & Minify JS
gulp.task('uglify', function(){
  return gulp.src('src/client/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        //.pipe(rename('app.min.js'))
        .pipe(uglify())
        //.pipe(uglify( {compress: {drop_debugger:false} }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/client/js'))
})


gulp.task('cssmin', function () {
    return gulp.src('src/client/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min.css'}))
        .pipe(gulp.dest('dist/client/css'));
});


// remove anything in dist
gulp.task('clean', function() {
    return gulp.src(['dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('clean-es5', function () {
    return gulp.src('src/client/js/app.js', {read: false})
        .pipe(clean())
})

gulp.task('gh-pages', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('deploy', function(cb){
    runSequence('build', ['gh-pages'], cb)
});

gulp.task('build', function(cb){
    runSequence('clean', 'copyfiles', 'lint','babel', 'usemin' /*, 'clean-es5'*/, cb)
});
