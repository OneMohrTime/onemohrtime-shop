let mix = require('laravel-mix');

require('laravel-mix-imagemin');

let PATHS = {
    node: './node_modules',
    src: './wp-content/themes/onemohrstore/src',
    dist: './wp-content/themes/onemohrstore/assets',
    proxy: 'https://shop.ddev.site'
};

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.jsx'],
        fallback: {
            'crypto': false,
            'stream': false,
            'path': false,
            'fs': false,
            'os': false,
            'module': false,
            'querystring': false,
            'https': false,
            'http': false,
            'zlib': false,
            'tty': false,
            'vm': false,
            'timers': false,
            'dns': false,
            'net': false,
            'constants': false,
            'child_process': false,
            'worker_threads': false,
            'async_hooks': false,
            'inspector': false,
            'readline': false,
        },
    },
    externals: {
        'graceful-fs': 'commonjs graceful-fs',
        'growly': 'commonjs growly',
        'jest-worker': 'commonjs jest-worker',
        'laravel-mix': 'commonjs laravel-mix',
        'node-notifier': 'commonjs node-notifier',
        'opn': 'commonjs opn',
        'portscanner': 'commonjs portscanner',
        'socket.io': 'commonjs socket.io',
        'browser-sync': 'commonjs browser-sync',
    },
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
    .sourceMaps(false, 'source-map')
    // .imagemin(
    //     'images/**.*',
    //     {
    //         context: 'src',
    //     },
    //     {
    //         optipng: {
    //             optimizationLevel: 5
    //         },
    //         jpegtran: null,
    //         plugins: [
    //             require('imagemin-mozjpeg')({
    //                 quality: 100,
    //                 progressive: true,
    //             }),
    //         ],
    //     }
    // )
    // .copyDirectory(`${PATHS.node}/@fortawesome/fontawesome-free/webfonts`, `${PATHS.dist}/fonts`)
    .copyDirectory(`${PATHS.src}/images`, `${PATHS.dist}/img`)
    // .copy(`${PATHS.src}/fonts/*`, `${PATHS.dist}/fonts`)
    // .copy(`${PATHS.node}/swiper/dist/js/swiper.js`, `${PATHS.dist}/js`)
    .js(`${PATHS.src}/scripts/app.js`, `${PATHS.dist}/js/`)
    // .js(`${PATHS.src}/scripts/a11y.js`, `${PATHS.dist}/js/`)
    .sass(`${PATHS.src}/styles/app.scss`, 'css')
    .options({
        processCssUrls: false
    })
    .setPublicPath(`${PATHS.dist}`);

mix.browserSync({
    proxy: `${PATHS.proxy}`,
    port: 3000,
    injectChanges: true,
    open: false,
    files: [`${PATHS.dist}/*.*`],
    logLevel: "debug"
});
