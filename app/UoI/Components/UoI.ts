export enum ContentType {ContentEmpty = 1, WikipediaContent = 2, OpenMathsContent = 3}

export class UoIConstruct {
    contentType:ContentType;
    id:string;
    position:ClientRect;

    // @TODO test this, it's easyyyyy
    constructor(identifier:string) {
        if (!identifier) {
            this.contentType = ContentType.ContentEmpty;
            this.id = null;
        } else {
            const
                explodeIdentifier = identifier.split(':'),
                identifierConstruct = _.first(explodeIdentifier);

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

    isWithinBoundingBox(x:number, y:number):boolean {
        return this.position
            && _.inRange(x, this.position.left, this.position.right)
            && _.inRange(y, this.position.top, this.position.bottom);
    }
}

export class UoI {
    contentType:ContentType;
    id:string;
    title:string;
    type:string;
    htmlContent:string;
    categories:string[];

    constructor(contentType:ContentType, data:any) {
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
}