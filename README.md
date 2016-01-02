# gulp-font2css [![Build Status](https://travis-ci.org/goblindegook/gulp-font2css.svg?branch=master)](https://travis-ci.org/goblindegook/gulp-font2css)

Encode font files as CSS using [Gulp](http://gulpjs.com).

This plugin automates the conversion of font files into a series of `@font-face` declarations containing each font encoded in base64.  It draws inspiration from [localFont](http://jaicab.com/localFont/) by Jaime Caballero.

The resulting CSS files are then used to implement `localStorage` caching of web fonts, using a deferred loading script such as [this one employed by Smashing Magazine](https://gist.github.com/hdragomir/8f00ce2581795fd7b1b7).

## Install

```
$ npm install --save-dev gulp-font2css
```

## Usage

```js
var gulp     = require('gulp')
var concat   = require('gulp-concat')
var font2css = require('gulp-font2css')

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.{otf,ttf,woff,woff2}')
    .pipe(font2css())
    .pipe(concat('fonts.css'))
    .pipe(gulp.dest('dist/'))
})
```

## Input files

`@font-face` property values are determined by the input file names, which must obey the following naming scheme with dash-separated attributes:

`<family>[-<weight>][-<style>].<extension>`

Font weight should be one of `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`. You may also provide a [commonly used weight name](http://www.w3.org/TR/css3-fonts/#font-weight-numeric-values) (except `normal`) that maps to one of these values.

Font style should be one of `normal`, `italic` or `oblique`.

For example, the following are valid names:

* `Lato.woff`
* `Lato-italic.woff`
* `Lato-bold.woff`
* `Lato-700.woff`
* `Lato-thin-italic.woff`
* `Lato-100-italic.woff`

The plugin will ignore any unknown keywords.

## Options

This plugin has no options.

## License

MIT © [Luís Rodrigues](https://github.com/goblindegook)
