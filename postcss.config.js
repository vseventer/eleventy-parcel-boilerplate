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
const PRODUCTION = process.env.NODE_ENV === 'production';

// Helpers.
const isTruthy = x => !!x;

// Exports.
export default {
    plugins: [
        stylelint(),
        PRODUCTION && purgecss({
            content: [ joinPath(INPUT_DIRECTORY, '**/*.njk') ],
            fontFace: true,
            keyframes: true
        }),
        autoprefixer(),
        reporter({ clearReportedMessages: true })
    ].filter(isTruthy)
};
