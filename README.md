# eleventy-parcel-boilerplate
> Starter kit for using [Eleventy] with [Parcel], backed by [Forestry].

[Eleventy] is <cite>_a simpler static site generator_</cite>, which does a beautiful job of scaffolding your static site. However, a web application is so much more; what about images, stylesheets, or scripts? This is where [Parcel], a <cite>_zero configuration web application bundler_</cite>, comes in. By combining [Eleventy] with [Parcel], you can take your static site to the next level with minimal effort.

As a bonus, this project is preconfigured to work out of the box with [Forestry], in case you use [Forestry] to edit your site content.

## Installation
**Recommended**

This project is set-up as a [Template Repository][1]. Click the "Use this template" button to create your new static site from this repository.

**Others**

1. Clone the repository using `git clone https://github.com/vseventer/eleventy-parcel-boilerplate`.
2. Navigate to your project directory using `cd eleventy-parcel-boilerplate`.
3. Install the dependencies using `npm install`.

_This project supports both `npm` and `yarn`, feel free to use whichever package manager you're most comfortable with._

## Getting Started
Please familiarize yourself with [Eleventy] and [Parcel], and you will recognize the source directory contains all you need to get started with your new static site.

By default, [Parcel] will mark all files in your top-level source directory as entry points of your static site. Typically, these are your `index.html`, `404.html`, `robots.txt`, or `CNAME`. This project assumes all other pages of your static site are referenced by any of these entry points, and Parcel will pick them up automatically.

## Development
* To start the development server, run `npm start` or `npm run watch` and navigate to `http://localhost:8080`.
* To build your site just once (for production), run `npm run build`.

_The development server, [browser-sync], is provided by [Eleventy] and set-up to work in sync with [Parcel]._

## Configuration
This project predefines a set of configuration files, which can be tweaked depending on your preferences.

### `package.json`
The `browserslist` property reflects the browsers your static website supports, per [browserslist].

The `homepage` property should reflect the URL of your production site. If you prefer to use absolute URLs, remove the `--public-url $npm_package_homepage` flag from the `parcel:build` npm script.

The `config` block in `package.json` enumerates three directories:
* `input`: the source of your web application.
* `intermediate`: the output directory for [Eleventy], and input directory for [Parcel]. You should never directly modify contents in this directory.
* `output`: the final build of your web application.

### `.babelrc`
The [Babel] smart preset is used allowing you to use the latest JavaScript. Two separate plugins supporting (private) class methods and properties are added by default as well.

### `.eslintrc` and `src/.eslintrc`
This project follows [Airbnb] configuration for [ESLint]. The source directory extends the base configuration, and makes sure you can use `process` in your JavaScript, as this is [supported][2] by [Parcel].

Linting is ran on your configuration files, as well as the scripts in the source directory of your static site.

### `.stylelintrc`
This project follows the recommended configuration for [stylelint], with support for SCSS-syntax. Linting is ran as part of [PostCSS] as explained below.

### `eleventy.config.js`
The [Eleventy] configuration file adds support for running a staging environment, useful for [Forestry] integration. The development server is also updated to redirect 404 routes to your `404.html` page (if present in your project).

In addition, it sets some sane defaults, as well as provide a boilerplate for how to add custom filters and tags. This project comes with two, a `debug` filter, and `link` custom Nunjucks tag.

### `postcss.config.js`
The [PostCSS] configuration adds a number of plugins. Your stylesheets are linted with [stylelint], before being optimized with [PurgeCSS] (production only), and [autoprefixer].

### `posthtml.config.js`
The [PostHTML] configuration adds a custom plugin to your pipeline, required to make [Eleventy] and [Parcel] play nice together. Do not remove this plugin unless you know what you are doing, or want your build to break.

### Parcel
[Parcel] does not have a separate configuration file, but does pick-up on packages named `parcel-plugin-*`. Included with this project are:
* `parcel-plugin-eslint`: required to run linting before building with [Parcel].
* `parcel-plugin-keep-asset-folders`: recommended if you want to keep your assets source directory structure rather than storing them all in the top-level output folder.
* `parcel-plugin-remove-index-html`: highly recommended if you want your final build to have nice URLs (`https://example.com/` vs `https://example.com/index.html`).

## Content Management
Content of your site lives in the `src/` directory by default.

If you are using [Forestry] to manage your content, import your site by following the steps in the [Forestry] Dashboard. This project is set-up so that the [Instant Preview][3] functionality of Forestry will work out of the box.

## Alternatives
* [parceleventy] (not actively maintained)

## License
    The MIT License (MIT)

    Copyright (c) 2019 Mark van Seventer

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[eleventy]: https://www.11ty.io/
[airbnb]: https://github.com/airbnb/javascript
[autoprefixer]: https://github.com/postcss/autoprefixer
[babel]: https://babeljs.io/
[browser-sync]: https://www.browsersync.io/
[browserslist]: https://github.com/browserslist/browserslist
[eslint]: https://eslint.org/
[forestry]: https://forestry.io/
[parcel]: https://parceljs.org/
[parceleventy]: https://github.com/chrisdmacrae/parceleventy
[postcss]: https://postcss.org/
[posthtml]: https://github.com/posthtml/posthtml
[purgecss]: https://www.purgecss.com/
[stylelint]: https://stylelint.io/
[1]: https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template
[2]: https://parceljs.org/env.html
[3]: https://forestry.io/docs/previews/instant-previews/
