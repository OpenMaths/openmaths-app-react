export enum ContentType {ContentEmpty = 1, WikipediaContent = 2, OpenMathsContent = 3}

export class UoIConstruct {
    contentType:ContentType;
    id:string;
    constructId:string;
    position:ClientRect;

    // @TODO test this, it's easyyyyy
    constructor(identifier:string) {
        this.constructId = identifier;

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
                    this.id = _.without(explodeIdentifier, identifierConstruct).join(':');
                    break;
                default:
                    this.contentType = ContentType.ContentEmpty;
                    this.id = null;
                    break;
            }
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