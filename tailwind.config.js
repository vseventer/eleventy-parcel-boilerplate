// @see https://tailwindcss.com/docs/configuration

// Standard lib.
import { join as joinPath } from 'path';

// Local modules.
import {
  INPUT_DIRECTORY,
  PRODUCTION,
} from './lib/constants';

// Constants.
// @see https://www.11ty.io/docs/languages/
const ELEVENTY_TEMPLATE_LANGUAGES = [
  'html', 'md', '11ty.js', 'liquid', 'njk', 'hbs', 'mustache', 'ejs', 'haml', 'pug', 'jstl',
];

// Exports.
module.exports = {
  // @see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  purge: {
    content: [joinPath(INPUT_DIRECTORY, `**/*.{${ELEVENTY_TEMPLATE_LANGUAGES}}`)],
    enabled: PRODUCTION,
    mode: 'all', // Remove all unused styles, not just Tailwinds'.
    options: {
      fontFace: true,
      keyframes: true,
      safelist: [],
      variables: true,
    },
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
