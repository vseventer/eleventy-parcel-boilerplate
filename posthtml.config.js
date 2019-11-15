// Local modules.
import appendIndexHTML from './lib/posthtml/append-index-html';

// Exports.
module.exports = {
  plugins: {
    // Do NOT remove this as it will break Parcel HTML entry points.
    'posthtml-urls': appendIndexHTML
  }
};
