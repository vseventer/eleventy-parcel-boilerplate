// @see https://www.11ty.io/docs/filters/

// Standard lib.
import { inspect } from 'util';

// Exports.
export default (value) => {
  console.debug(inspect(value, { colors: true })); // eslint-disable-line no-console
  return inspect(value);
};
