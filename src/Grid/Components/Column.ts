import * as _ from 'lodash'
import * as shortid from 'shortid'

import UoI from '../../UoI/UoI'
import { Grid, GridUrlConstruct }from './Grid'

export enum ColumnConstructor { Content, Empty }

export interface ColumnUrlConstruct {
    [id:string]:string|GridUrlConstruct
}

export class Column {
    id:string;
    child;

    constructor(input:ColumnUrlConstruct) {
        if (!input || !_.isObject(input) || _.isArray(input))
            throw new TypeError('The input of Column needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Column can only have one key, e.g. be of format {column: ...}');

        this.id = _.first(keys).toString();

        const content = input[this.id];

        this.child = (!content || _.isString(content)) ? new UoI(content) : new Grid(content);
    };

    // @TODO more unit tests
    static construct(type:ColumnConstructor, content:string|GridUrlConstruct):ColumnUrlConstruct {
        const id = shortid.generate();

        let resultingObject:ColumnUrlConstruct = {};

        switch (type) {
            case ColumnConstructor.Content:
                resultingObject[id] = content;
                break;
            case ColumnConstructor.Empty:
                resultingObject[id] = null;
                break;
        }

        return resultingObject;
    }
}