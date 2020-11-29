// Local modules.
import { config } from '~/package.json';

// Exports.
export const {
  intermediate: INTERMEDIATE_DIRECTORY,
  input: INPUT_DIRECTORY,
  output: OUTPUT_DIRECTORY,
} = config;

// Don't rely on NODE_ENV as it is always set to production:
// - https://github.com/parcel-bundler/parcel/issues/4550
// - https://github.com/parcel-bundler/parcel/issues/5029
export const PRODUCTION = process.env.BUILD_ENV === 'production';
