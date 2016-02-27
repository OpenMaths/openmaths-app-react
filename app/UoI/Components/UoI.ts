export default class UoI {
    id:string;
    title:string;

    position:ClientRect;

    constructor(data) {
        this.id = data.id ? data.id : null;
        this.title = data.meta && data.meta.title ? data.meta.title : null;
    }

    isWithinBoundingBox(x:number, y:number) {
        return _.inRange(x, this.position.left, this.position.right) && _.inRange(y, this.position.top, this.position.bottom);
    }
}