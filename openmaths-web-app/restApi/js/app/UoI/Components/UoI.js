"use strict";
(function (ContentType) {
    ContentType[ContentType["ContentEmpty"] = 1] = "ContentEmpty";
    ContentType[ContentType["WikipediaContent"] = 2] = "WikipediaContent";
    ContentType[ContentType["OpenMathsContent"] = 3] = "OpenMathsContent";
})(exports.ContentType || (exports.ContentType = {}));
var ContentType = exports.ContentType;
var UoIConstruct = (function () {
    function UoIConstruct(identifier) {
        if (!identifier) {
            this.contentType = ContentType.ContentEmpty;
            this.id = null;
        }
        else {
            var explodeIdentifier = identifier.split(':'), identifierConstruct = _.first(explodeIdentifier);
            switch (identifierConstruct) {
                case 'w':
                    this.contentType = ContentType.WikipediaContent;
                    break;
                default:
                    this.contentType = ContentType.ContentEmpty;
                    break;
            }
            this.id = identifierConstruct
                ? _.without(explodeIdentifier, identifierConstruct).join(':') : explodeIdentifier.join(':');
        }
    }
    UoIConstruct.prototype.isWithinBoundingBox = function (x, y) {
        return this.position
            && _.inRange(x, this.position.left, this.position.right)
            && _.inRange(y, this.position.top, this.position.bottom);
    };
    return UoIConstruct;
}());
exports.UoIConstruct = UoIConstruct;
var UoI = (function () {
    function UoI(contentType, data) {
        switch (contentType) {
            case ContentType.WikipediaContent:
                this.contentType = contentType;
                this.id = data.id;
                this.title = data.title;
                this.type = 'Wikipedia Content';
                this.htmlContent = data.htmlContent;
                this.categories = data.categories;
        }
    }
    return UoI;
}());
exports.UoI = UoI;
//# sourceMappingURL=UoI.js.map