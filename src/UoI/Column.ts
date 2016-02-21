import * as _ from 'lodash'

import UoI from './UoI'
import Grid from './Grid'

export default class Column {
    id:string;
    child;

    constructor(id, input) {
        this.id = id.toString();
        this.child = (!input || _.isString(input)) ? new UoI(input) : new Grid(input);
    };
}