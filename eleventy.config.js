// @see https://www.11ty.io/docs/config/

// Standard lib.
import { join as joinPath } from 'path';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = config.input;
// const OUTPUT_DIRECTORY = config.output;

// Exports.
export default (eleventyConfig) => {
    // Proxy to Parcel.js development server.
    // @see https://www.11ty.io/docs/config/#override-browsersync-server-options
    eleventyConfig.setBrowserSyncConfig({
        proxy: { target: 'localhost:1234', ws: true },
        server: false
    });

    // Parcel.js needs our linter configuration.
    eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '.*rc*'));

    // Manual passthrough file copy.
    // @see https://www.11ty.io/docs/copy/
    eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/*.{js,png,scss,txt}'));
};
