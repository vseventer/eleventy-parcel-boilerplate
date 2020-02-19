// @see https://github.com/postcss/postcss-loader#configuration

// Standard lib.
import { join as joinPath } from 'path';

// Package modules.
import autoprefixer from 'autoprefixer';
import purgecss from '@fullhuman/postcss-purgecss';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
// const OUTPUT_DIRECTORY = config.output;
const PRODUCTION = process.env.TARGET_ENV === 'production';

// @see https://www.11ty.io/docs/languages/
const ELEVENTY_TEMPLATE_LANGUAGES = [
  'html', 'md', '11ty.js', 'liquid', 'njk', 'hbs', 'mustache', 'ejs', 'haml', 'pug', 'jstl'
];

// Helpers.
const isTruthy = (x) => !!x;

// Exports.
module.exports = {
  plugins: [
    stylelint(),
    PRODUCTION && purgecss({
      // Purge using templates rather than the full output.
      content: [joinPath(INPUT_DIRECTORY, `**/*.{${ELEVENTY_TEMPLATE_LANGUAGES}}`)],
      fontFace: true,
      keyframes: true
    }),
    autoprefixer(),
    reporter({ clearReportedMessages: true })
  ].filter(isTruthy)
};
