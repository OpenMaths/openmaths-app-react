import * as katex from 'katex'

export class KaTexHelpers {
    // Greedy & Multi-line
    private static regexFlags = 'gm';

    private static renderToString(match:string):string {
        return katex.renderToString(match);
    }

    static parse(content:string):string {
        let regex = new RegExp('\$(.*?)\$', KaTexHelpers.regexFlags);

        return content.replace(regex, match => KaTexHelpers.renderToString(match));
    }
}