"use strict";
var katex = require('katex');
var KaTexHelpers = (function () {
    function KaTexHelpers() {
    }
    KaTexHelpers.renderToString = function (match) {
        return katex.renderToString(match);
    };
    KaTexHelpers.parse = function (content) {
        var regex = new RegExp('\$(.*?)\$', KaTexHelpers.regexFlags);
        return content.replace(regex, function (match) { return KaTexHelpers.renderToString(match); });
    };
    KaTexHelpers.regexFlags = 'gm';
    return KaTexHelpers;
}());
exports.KaTexHelpers = KaTexHelpers;
//# sourceMappingURL=KaTexHelpers.js.map