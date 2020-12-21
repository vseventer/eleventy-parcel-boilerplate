// @see https://www.11ty.io/docs/config/

// Standard lib.
import {
  basename,
  extname,
  join as joinPath,
  relative as relativePath,
} from 'path';

// Package modules.
import EleventyImage from '@11ty/eleventy-img';

// Local modules.
import {
  INPUT_DIRECTORY,
  INTERMEDIATE_DIRECTORY,
} from './lib/constants';
import inspect from './lib/filters';
import NunjucksLinkExtension from './lib/nunjucks/tags/link';
import imageShortcode from './src/_shortcodes/image';

// Constants.
const ELEVENTY_IMAGE_DEFAULT_URL_PATH = '/images/';

// Helpers.
const formatImageFilename = (id, src, width, format /* , options */) => {
  const filename = basename(src, extname(src));
  return `${filename}.${width}w.${format}`;
};

// Exports.
module.exports = (eleventyConfig) => {
  // Add universal filters.
  // @see https://www.11ty.io/docs/filters/
  eleventyConfig.addFilter('debug', inspect);
  eleventyConfig.addFilter('pageURL', ({ outputPath, url }) => {
    if (outputPath) {
      return joinPath('/', outputPath);
    }
    return eleventyConfig.getFilter('url')(url);
  });

  // Add utility to perform build-time image manipulation.
  eleventyConfig.addNunjucksAsyncShortcode('image', async (src, options) => {
    const urlPath = options?.urlPath || ELEVENTY_IMAGE_DEFAULT_URL_PATH;
    const stats = await EleventyImage(src, {
      filenameFormat: formatImageFilename,
      formats: [extname(src).substring(1)], // Use input format.
      ...options,
      outputDir: joinPath(INTERMEDIATE_DIRECTORY, urlPath),
      urlPath: joinPath('~', INTERMEDIATE_DIRECTORY, urlPath),
    });
    return imageShortcode(stats, options);
  });

  // Add custom tags.
  // @see https://www.11ty.io/docs/shortcodes/
  eleventyConfig.addNunjucksTag('link', NunjucksLinkExtension.singleton);

  // Copy static assets.
  eleventyConfig.addPassthroughCopy(joinPath(INPUT_DIRECTORY, '*.txt'));

  // Return configuration options.
  // @see https://www.11ty.io/docs/config/
  return {
    // @see https://www.11ty.io/docs/config/#input-directory
    dir: {
      layouts: relativePath(INPUT_DIRECTORY, joinPath(INPUT_DIRECTORY, '_layouts/')),
    },

    // @see https://www.11ty.io/docs/config/#default-template-engine-for-markdown-files
    markdownTemplateEngine: 'njk',
  };
};
