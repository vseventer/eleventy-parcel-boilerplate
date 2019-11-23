// @see https://www.11ty.io/docs/languages/javascript/

// Standard lib.
import { URL as NodeURL } from 'url';

// Package modules.
import { homepage } from '../package.json';

// Constants.
const CNAME_FILE = 'CNAME';

// Exports.
module.exports = class CNameRecord {
  #hostname = null;

  data = { permalink: CNAME_FILE }

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
