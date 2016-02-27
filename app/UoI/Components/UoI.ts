export default class UoI {
    id:string;
    title:string;

    position:ClientRect;

    constructor(data) {
        this.id = data.id ? data.id : null;
        this.title = data.meta && data.meta.title ? data.meta.title : null;
    }
}