const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   .sass('resources/sass/style.scss', 'public/css');

    //js
   mix.copy('resources/js/fontend/js/aos.js','public/js');
   mix.copy('resources/js/fontend/js/bootstrap-datepicker.min.js','public/js');
   mix.copy('resources/js/fontend/js/bootstrap.min.js','public/js');
   mix.copy('resources/js/fontend/js/jquery-3.3.1.min.js','public/js');
   mix.copy('resources/js/fontend/js/jquery-migrate-3.0.1.min.js','public/js');
   mix.copy('resources/js/fontend/js/jquery-ui.js','public/js');
   mix.copy('resources/js/fontend/js/jquery.countdown.min.js','public/js');
   mix.copy('resources/js/fontend/js/jquery.magnific-popup.min.js','public/js');
   mix.copy('resources/js/fontend/js/jquery.stellar.min.js','public/js');
   mix.copy('resources/js/fontend/js/main.js','public/js');
   mix.copy('resources/js/fontend/js/mediaelement-and-player.min.js','public/js');
   mix.copy('resources/js/fontend/js/owl.carousel.min.js','public/js');
   mix.copy('resources/js/fontend/js/popper.min.js','public/js');
   mix.copy('resources/js/fontend/js/slick.min.js','public/js');

   //css
   mix.copy('resources/js/fontend/css/animate.css','public/css');
   mix.copy('resources/js/fontend/css/aos.css','public/css');
   mix.copy('resources/js/fontend/css/bootstrap-datepicker.css','public/css');
   mix.copy('resources/js/fontend/css/bootstrap.min.css','public/css');
   mix.copy('resources/js/fontend/css/jquery-ui.css','public/css');
   mix.copy('resources/js/fontend/css/magnific-popup.css','public/css');
   mix.copy('resources/js/fontend/css/mediaelementplayer.css','public/css');
   mix.copy('resources/js/fontend/css/owl.carousel.min.css','public/css');
   mix.copy('resources/js/fontend/css/owl.theme.default.min.css','public/css');
   mix.copy('resources/js/fontend/css/custom.css','public/css');
//    mix.copy('resources/js/fontend/css/style.css','public/css');
