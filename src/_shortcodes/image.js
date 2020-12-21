// Package modules.
import render from 'posthtml-render';

// Helpers.
const generateSrcSet = (entries) => (
  entries
    .map((entry) => entry.srcset)
    .join(', ')
);

// Exports.
export default (stats, options = {}) => {
  const {
    alt = '',
    sizes = '100vw',
  } = options;

  const formats = Object.keys(stats);
  const [firstFormat] = formats;

  // Use lowest-quality src as base img element.
  const [{ url, width, height }] = stats[firstFormat];
  const lowestSrc = {
    tag: 'img',
    attrs: {
      src: url,
      width,
      height,
      alt,
    },
  };

  // Use single img element if there's only one format.
  if (formats.length === 1) {
    const entries = stats[firstFormat];

    // Append srcset only if there's more than one entry.
    if (entries.length > 1) {
      lowestSrc.attrs = {
        ...lowestSrc.attrs,
        sizes,
        srcset: generateSrcSet(entries),
      };
    }

    return render(lowestSrc);
  }

  // Use picture element otherwise.
  return render({
    tag: 'picture',
    content: [
      ...formats.map((format) => ({
        tag: 'source',
        attrs: {
          sizes,
          srcset: generateSrcSet(stats[format]),
          type: `image/${format}`,
        },
      })),
      lowestSrc,
    ],
  });
};
