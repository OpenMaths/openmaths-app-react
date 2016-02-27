import * as _ from 'lodash'
import * as shortid from 'shortid'

import UoI from '../../UoI/Components/UoI'
import { Grid, GridUrlConstruct }from './Grid'

export enum ColumnConstructor { Content, Empty }

export interface ColumnUrlConstruct {
    [id:string]:string|GridUrlConstruct
}

export class Column {
    id:string;
    child:UoI|Grid;
    constructInput:ColumnUrlConstruct;

    constructor(input:ColumnUrlConstruct) {
        if (!input || !_.isObject(input) || _.isArray(input)) {
            console.error(input);
            throw new TypeError('The input of Column needs to be a valid Object');
        }

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Column can only have one key, e.g. be of format {column: ...}');

        const
            inputId = _.first(keys).toString(),
            content = input[inputId];

        this.id = inputId;

        // Reconstruct the input with correct identifier
        this.constructInput = {};
        this.constructInput[this.id] = content;

        this.child = (!content || _.isString(content)) ? new UoI({id: content}) : new Grid(content);
    };

    static constructUrl(type:ColumnConstructor, content:string|GridUrlConstruct):ColumnUrlConstruct {
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

    static constructEmptyUrl():ColumnUrlConstruct {
        return Column.constructUrl(ColumnConstructor.Empty, null);
    }

    getConstructUrl():ColumnUrlConstruct {
        const child:any = this.child;

        let content;

        if (child instanceof Grid) {
            content = child.getConstructUrl();
        } else {
            content = child.id;
        }

        return Column.constructUrl(ColumnConstructor.Content, content);
    }
}