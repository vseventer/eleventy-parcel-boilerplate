// Standard lib.
import { join as joinPath } from 'path';
import { URL as nodeURL } from 'url';

// Constants.
const FILTER_OPTIONS = {
    a: { href: true },
    link: { href: true }
};

// Replace trailing '/' with '/index.html' in all HTML assets in this project.
const eachURL = (url) => {
    if (url.slice(-1) === '/') {
        try { // Do not alter full URLs.
            return (new nodeURL(url)).href;
        }
        catch (e) { // Append 'index.html'.
            return joinPath(url, 'index.html');
        }
    }
    return url; // Return original.
};

// Exports.
module.exports = {
    plugins: {
        // Do NOT remove this as it will break Parcel HTML entry points.
        'posthtml-urls': {
            eachURL,
            filter: FILTER_OPTIONS
        }
    }
};
