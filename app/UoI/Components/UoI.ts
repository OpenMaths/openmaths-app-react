export default class UoI {
    id:string;
    title:string;
    type:string;
    htmlContent:string;

    position:ClientRect;

    constructor(data:any) {
        this.id = data.id ? data.id : null;
        this.title = data.meta && data.meta.title ? data.meta.title : null;
        this.type = data.umiType ? data.umiType : null;
        this.htmlContent = data.htmlContent ? data.htmlContent : null;
    }

    isWithinBoundingBox(x:number, y:number) {
        return _.inRange(x, this.position.left, this.position.right) && _.inRange(y, this.position.top, this.position.bottom);
    }
}