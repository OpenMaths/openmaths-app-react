import Column from './Column'

export default class Row {
    id:string;
    children:Column[];

    constructor(id, input) {
        this.id = id.toString();
        this.children = _.map(input, (input, id) => new Column(id, input));
    }
}