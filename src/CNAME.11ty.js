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

// Exports.
module.exports = class CNameRecord {
  #hostname = null;

  data = {
    permalink: CNAME_FILE,
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
