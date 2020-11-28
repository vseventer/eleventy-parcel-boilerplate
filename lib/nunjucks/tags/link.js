// @see https://mozilla.github.io/nunjucks/api.html#custom-tags

// Standard lib.
import { resolve as resolvePath } from 'path';
import { inspect } from 'util';

// Local modules.
import { INPUT_DIRECTORY } from '~/lib/constants';

// Exports.
export default class LinkExtension {
  #memo = { };

  #nunjucksEngine;

  tags = ['link'];

  static #instance = null;

  constructor(nunjucksEngine) {
    this.#nunjucksEngine = nunjucksEngine;
  }

  parse(parser, nodes /* , lexer */) {
    // Get the tag token.
    const tok = parser.nextToken();

    // Parse the args and move after the block end.
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  }

  run({ ctx }, rawInputPath) {
    // Memoize result.
    const search = resolvePath(INPUT_DIRECTORY, rawInputPath);
    if (!Object.prototype.hasOwnProperty.call(this.#memo, search)) {
      const page = ctx.collections.all.find(({ inputPath }) => resolvePath(inputPath) === search);
      this.#memo[search] = page ? page.url : null;
    }

    // Return the result, or fail if no such page was found.
    const result = this.#memo[search];
    if (result === null) {
      throw new Error(`Invalid link: no page for ${inspect(rawInputPath)}`);
    }
    return new this.#nunjucksEngine.runtime.SafeString(result);
  }

  static singleton(nunjucksEngine) {
    if (LinkExtension.#instance === null) {
      LinkExtension.#instance = new LinkExtension(nunjucksEngine);
    }
    return LinkExtension.#instance;
  }
}
