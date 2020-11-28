// Local modules.
import { config } from '~/package.json';

// Exports.
export const {
  intermediate: INTERMEDIATE_DIRECTORY,
  input: INPUT_DIRECTORY,
  output: OUTPUT_DIRECTORY
} = config;

export const PRODUCTION = process.env.NODE_ENV === 'production';
