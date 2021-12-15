const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const concat = require("gulp-concat");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
}

exports.html = html;

//Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(concat("main.js"))
    .pipe(terser())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"));
}

exports.scripts = scripts;

//Img

const optimizeImages = () => {
  return gulp.src(["source/img/**/*.{png,jpg,svg}", "!source/img/sprite/**/*"])
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src(["source/img/**/*.{png,jpg,svg}", "!source/img/sprite/**/*"])
    .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

//Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

//Sprite

const sprite = () => {
  return gulp.src("source/img/**/sprite-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"))
}

exports.sprite = sprite;

//Copy

const copy = (done) => {
  gulp.src([
      "source/fonts/*.{woff,woff2}",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

//Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/app.js", gulp.series(scripts));
  // gulp.watch("source/*.html").on("change", sync.reload);
    gulp.watch("source/*.html", gulp.series(html, reload));
    gulp.watch("source/img", gulp.series(html, reload));
}

//Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    html,
    styles,
    sprite,
    createWebp,
    scripts
  ),
);

exports.build = build;

//Start

exports.default =  gulp.series(
//  clean,
  //copy,
  //copyImages,
  //gulp.parallel(
  //  html,
  //  styles,
    //sprite,
    //createWebp,
   // scripts
   // build
 // ),
  build,
  gulp.series(
    server, watcher
  ));
