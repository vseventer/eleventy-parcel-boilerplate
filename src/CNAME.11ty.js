// @see https://www.11ty.io/docs/languages/javascript/

// Standard lib.
import { join as joinPath } from 'path';
import { URL as NodeURL } from 'url';

// Package modules.
import {
  config,
  homepage
} from '../package.json';

// Constants.
const OUTPUT_DIRECTORY = config.output;
const CNAME_FILE = joinPath(OUTPUT_DIRECTORY, 'CNAME');
const PRODUCTION = process.env.TARGET_ENV === 'production';

// Exports.
module.exports = class CNameRecord {
  #hostname = null;

  data = {
    permalink: PRODUCTION && CNAME_FILE, // Enable only in production.
    permalinkBypassOutputDir: true
  }

  constructor() {
    // Extract hostname from homepage.
    // If not a valid URL, disable CNAME generation altogether.
    try {
      this.#hostname = new NodeURL(homepage).hostname;
    } catch (e) {
      this.data.permalink = false;
    }
  }

  render() {
    return this.#hostname;
  }
};
