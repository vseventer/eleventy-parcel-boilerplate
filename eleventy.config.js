// @see https://www.11ty.io/docs/config/

// Standard lib.
import {
  existsSync,
  readFileSync
} from 'fs';
import {
  join as joinPath,
  relative as relativePath
} from 'path';

// Local modules.
import { config } from './package.json';
import inspect from './lib/filters';
import NunjucksLinkExtension from './lib/nunjucks/tags/link';

// Constants.
const INPUT_DIRECTORY = config.input;
// const INTERMEDIATE_DIRECTORY = config.intermediate;
const OUTPUT_DIRECTORY = config.output;
const STAGING = process.env.NODE_ENV === 'staging';

// Exports.
module.exports = (eleventyConfig) => {
  // @see https://www.11ty.io/docs/config/#override-browsersync-server-options
  eleventyConfig.setBrowserSyncConfig({
    // Redirect to 404 page, like gh-pages.
    // @see https://www.11ty.io/docs/quicktips/not-found/#with---serve
    callbacks: {
      ready: (err, bs) => {
        // Read file inside middleware so live updates to the page reflect.
        const notFoundPage = joinPath(OUTPUT_DIRECTORY, '404.html');
        bs.addMiddleware('*', (req, res, next) => {
          if (existsSync(notFoundPage)) {
            res.statusCode = 404;
            res.end(readFileSync(notFoundPage));
          } else {
            next();
          }
        });
      }
    },

    // Configure server to use Parcel output.
    server: OUTPUT_DIRECTORY,

    // Enable Instant Previews in Forestry.
    // @see https://forestry.io/docs/previews/instant-previews/
    ...STAGING && {
      host: '0.0.0.0',
      ui: false
    }
  });

  // Parcel needs any linter configuration.
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '.*rc*'));

  // Manual passthrough file copy.
  // @see https://www.11ty.io/docs/copy/
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/*.{css,scss,txt}'));
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/*.{gif,jpeg,jpg,png,svg,webp}'));

  // Copy vanilla JavaScript, but excludes Template Language extensions.
  // @see https://www.11ty.io/docs/languages/javascript/
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '**/!(*.11ty.js).js'));

  // Add universal filters.
  // @see https://www.11ty.io/docs/filters/
  eleventyConfig.addFilter('debug', inspect);

  // Add custom tags.
  // @see https://www.11ty.io/docs/shortcodes/
  eleventyConfig.addNunjucksTag('link', NunjucksLinkExtension.singleton);

  // Return configuration options.
  // @see https://www.11ty.io/docs/config/
  return {
    // @see https://www.11ty.io/docs/config/#input-directory
    dir: {
      layouts: relativePath(INPUT_DIRECTORY, joinPath(INPUT_DIRECTORY, '_layouts/'))
    },

    // @see https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files
    markdownTemplateEngine: 'njk'
  };
};
