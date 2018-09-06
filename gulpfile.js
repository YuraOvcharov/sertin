var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    reload = browserSync.reload;

var path = {
    public: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'public/',
        scripts: 'public/scripts/',
        styles: 'public/styles/',
        images: 'public/images/',
        fonts: 'public/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        scripts: 'src/scripts/main.js',//В стилях и скриптах нам понадобятся только main файлы
        styles: 'src/styles/main.scss',
        images: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        scripts: 'src/scripts/**/*.js',
        styles: 'src/styles/**/*.scss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './public'
};
var config = {
    server: {
        baseDir: "./public"
    },
    tunnel: true,
    host: 'localhost',
    port: 3000,
    logPrefix: "Frontend_Devil"
};
// Собираем html
gulp.task('html:public', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.public.html)) //Выплюнем их в папку public
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

// Собираем js
gulp.task('scripts:public', function () {
    gulp.src(path.src.scripts) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.public.scripts)) //Выплюнем готовый файл в public
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('scripts-vendor', function () {
    gulp.src([
        // Libraries
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/@fortawesome/fontawesome-free/js/all.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'node_modules/masonry-layout/dist/masonry.pkgd.min.js'
        /*'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jquery-mask-plugin/dist/jquery.mask.min.js',
        'bower_components/jquery-ui/jquery-ui.min.js',
        'bower_components/tether/dist/js/tether.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/autosize/dist/autosize.min.js',
        'bower_components/moment/moment.js',
        'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        'bower_components/owl.carousel/dist/owl.carousel.min.js',
        'bower_components/jquery-validation/dist/jquery.validate.js',
        'bower_components/mustache.js/mustache.min.js',
        'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
        'bower_components/jquery-validation/src/localization/messages_ru.js',
        'bower_components/jquery-mask-plugin/dist/jquery.mask.min.js',
        'bower_components/jquery-sticky/jquery.sticky.js'*/
    ])
        .pipe(rigger()) //Прогоним через rigger
        .pipe(concat('vendor.min.js'))
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.public.scripts)) //Выплюнем готовый файл в public
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
// Собираем css
gulp.task('styles:public', function () {
    var AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];
    //gulp.src(path.src.styles) //Выберем наш main.scss
    return gulp.src([
        // Import fonts at the beginning of the css file
        'src/styles/import-fonts.scss',

        // Libraries
        'node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
        'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        /*'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/jquery-ui/themes/base/jquery-ui.css',
        'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
        'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
        'bower_components/owl.carousel/dist/assets/owl.carousel.min.css',*/

        // Custom Styles
        'src/styles/main.scss',
    ])
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass({
          precision: 10
        }).on('error', sass.logError))//Скомпилируем
        .pipe(prefixer(AUTOPREFIXER_BROWSERS))
        .pipe(cleanCSS()) //Сожмем
         .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.public.styles)) //И в build
        .pipe(reload({stream: true}));
});
// Собираем images
gulp.task('images:public', function () {
    gulp.src(path.src.images) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.public.images)) //И бросим в public
        .pipe(reload({stream: true}));
});

//Копируем fonts

gulp.task('fonts:public', function() {
    gulp.src(path.src.fonts + 
        'node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest(path.public.fonts))
});

gulp.task('public', [
    'html:public',
    'scripts:public',
    'styles:public',
    'fonts:public',
    'images:public',
    'scripts-vendor'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:public');
    });
    watch([path.watch.styles], function(event, cb) {
        gulp.start('styles:public');
    });
    watch([path.watch.scripts], function(event, cb) {
        gulp.start('scripts:public');
    });
    watch([path.watch.images], function(event, cb) {
        gulp.start('images:public');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:public');
    });

});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['public', 'webserver', 'watch']);