// @see https://www.11ty.io/docs/config/

// Standard lib.
import {
    join as joinPath,
    relative as relativePath
} from 'path';

// Local modules.
import { config } from './package.json';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
// const OUTPUT_DIRECTORY = config.output;

// Exports.
export default (eleventyConfig) => {
    // Proxy to Parcel development server.
    // @see https://www.11ty.io/docs/config/#override-browsersync-server-options
    eleventyConfig.setBrowserSyncConfig({
        proxy: { target: 'localhost:1234', ws: true },
        server: false
    });

    // Parcel needs any linter configuration.
    eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '.*rc*'));

    // Manual passthrough file copy.
    // @see https://www.11ty.io/docs/copy/
    eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/*.{js,scss,txt}'));
    eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/*.{gif,jpeg,jpg,png,svg,webp}'));

    // Return configuration options.
    // @see https://www.11ty.io/docs/config/
    return {
        // @see https://www.11ty.io/docs/config/#input-directory
        dir: {
            layouts: relativePath(INPUT_DIRECTORY, joinPath(INPUT_DIRECTORY, '_layouts/'))
        }
    };
};
