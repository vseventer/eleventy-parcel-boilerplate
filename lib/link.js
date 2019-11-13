// @see https://mozilla.github.io/nunjucks/api.html#custom-tags

// Standard lib.
import { resolve as resolvePath } from 'path';
import { inspect } from 'util';

// Local modules.
import { config } from '../package.json';

// Constants.
const INPUT_DIRECTORY = config.input;

// Exports.
export class LinkExtension {
    constructor(nunjucksEngine) {
        // Private fields.
        this._memo = { };
        this._nunjucksEngine = nunjucksEngine;

        // Public fields.
        this.tags = [ 'link' ];
    }

    parse(parser, nodes/*, lexer*/) {
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
        if (!Object.prototype.hasOwnProperty.call(this._memo, search)) {
            const page = ctx.collections.all.find(({ inputPath }) => {
                return resolvePath(inputPath) === search;
            });
            this._memo[search] = page ? page.url : null;
        }

        // Return the result, or fail if no such page was found.
        const result = this._memo[search];
        if (result === null) {
            throw new Error(`Invalid link: no page for ${inspect(rawInputPath)}`);
        }
        return new this._nunjucksEngine.runtime.SafeString(result);
    }

    static singleton(nunjucksEngine) {
        if (typeof LinkExtension._instance === 'undefined') {
            LinkExtension._instance = new LinkExtension(nunjucksEngine);
        }
        return LinkExtension._instance;
    }
}
