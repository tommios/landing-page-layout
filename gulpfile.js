const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const pug = require("gulp-pug");
const rimraf = require("rimraf");
const spritesmith = require("gulp.spritesmith");
const rename = require("gulp-rename");

/* ----  Static server  ---- */
gulp.task("server", function () {
  browserSync.init({
    server: {
      port: 9000,
      baseDir: "build",
    },
  });

  gulp.watch("build/**/*").on("change", browserSync.reload);
});

/* ----  gulp-pug  ---- */
gulp.task("templates:compile", function buildHTML() {
  return gulp
    .src("source/template/index.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("build"));
});

/* ----  gulp-sass  ---- */
gulp.task("styles:compile", function () {
  return gulp
    .src("source/styles/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest("build/css"));
});

<<<<<<< HEAD
=======


>>>>>>> settings-gulpfile
/* ----  sprites  ---- */
gulp.task("sprite", function (cb) {
  const spriteData = gulp.src("source/images/icons/*.png").pipe(
    spritesmith({
      imgName: "sprite.png",
<<<<<<< HEAD
      imgPath: "../images/sprite.png",
=======

>>>>>>> settings-gulpfile
      cssName: "sprite.scss",
    })
  );

  spriteData.img.pipe(gulp.dest("build/images/"));
  spriteData.css.pipe(gulp.dest("source/styles/global/"));

  cb();
});

/* ----  Delete  ---- */
gulp.task("clean", function del(cb) {
  return rimraf("build", cb);
});

/* ----  Copy fonts  ---- */
gulp.task("copy:fonts", function () {
  return gulp.src("./source/fonts/**/*.*").pipe(gulp.dest("build/fonts"));
});

/* ----  Copy images  ---- */
gulp.task("copy:images", function () {
  return gulp.src("./source/images/**/*.*").pipe(gulp.dest("build/images"));
});

/* ------  Copy  ------ */
gulp.task("copy", gulp.parallel("copy:fonts", "copy:images"));

/* ------  Watchers  ------ */
gulp.task("watch", function () {
  gulp.watch("source/template/**/*.pug", gulp.series("templates:compile"));
  gulp.watch("source/styles/**/*.scss", gulp.series("styles:compile"));
});

/* ------  default  ------ */
gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("templates:compile", "styles:compile", "sprite", "copy"),
    gulp.parallel("watch", "server")
  )
);
