const mix = require("laravel-mix");

mix
    .setPublicPath("dist")
    .setResourceRoot("/Styles/dist/")
    .autoload({
        jquery: ["window.jQuery", "jQuery", "$"],
        'popper.js': ['window.Popper', 'Popper'],
    })
    .copy("src/images", "dist/images")
    .ts("src/js/main.tsx", "dist/js")
    .sass("src/scss/main.scss", "dist/css")
    .sourceMaps();