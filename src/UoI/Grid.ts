import * as _ from 'lodash'
import Row from './Row'

export default class Grid {
    id:string;
    children:Row[];

    constructor(input) {
        // @TODO Check for the number of children first, throw an exception if invalid
        //this.children = _.map(input, rowInput => new Row(rowInput));
        this.id = _.first(_.keys(input)).toString();
        this.children = _.map(_.values(input[this.id]), rowInput => new Row(rowInput));
    }
}