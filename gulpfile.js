// Importa os módulos necessários
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));

}

function comprimeImagens() {
    return gulp.src('./source/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}  

// Função para compilar o Sass
function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}

// Função para "vigiar" os arquivos
exports.default = function () {
    gulp.watch('./source/styles/**/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/**/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
};

exports.sass = compilaSass;
exports.javascript = comprimeJavaScript;
exports.comprimeImagens = comprimeImagens;
