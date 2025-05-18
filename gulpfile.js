const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-html-minifier-terser");

const paths = {
    css: {
        src: "./src/css/*.css",
        dest: "./docs/css/",
    },
    html: {
        src: "./src/*.html",
        dest: "./docs/",
    },
    assets: {
        src: "./src/assets/**/*",
        dest: "./docs/assets/",
    },
};

function styles() {
    const plugins = [autoprefixer({ cascade: false, grid: "autoplace" })];

    return gulp
        .src(paths.css.src)
        .pipe(postcss(plugins))
        .pipe(
            cleanCSS({
                level: {
                    1: {
                        all: true,
                        specialComments: 0,
                    },
                },
            })
        )
        .pipe(gulp.dest(paths.css.dest));
}

function html() {
    return gulp
        .src(paths.html.src)
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            })
        )
        .pipe(gulp.dest(paths.html.dest));
}

function assets() {
    return gulp
        .src(paths.assets.src, { encoding: false })
        .pipe(gulp.dest(paths.assets.dest));
}

exports.default = gulp.series(styles, html, assets);
