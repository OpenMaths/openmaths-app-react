import * as _ from 'lodash'
import * as shortid from 'shortid'

import { RowPosition } from '../DataModel'

import { Row, RowUrlConstruct } from './Row'
import { Column, ColumnConstructor } from './Column'

export interface GridUrlConstruct {
    [id:string]:RowUrlConstruct[]
}

export class Grid {
    id:string;
    children:Row[];
    constructInput:GridUrlConstruct;
    initialiser:boolean;

    constructor(input:GridUrlConstruct, initialiser?:boolean) {
        if (!input || !_.isObject(input) || _.isArray(input)) {
            console.error(input);
            throw new TypeError('The input of Grid needs to be a valid Object');
        }

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Grid can only have one key, e.g. be of format {key: {...rows}}');

        const
            inputId = _.first(keys).toString(),
            rowsInput = input[inputId];

        this.id = inputId;

        // Reconstruct the input with correct identifier
        this.constructInput = {};
        this.constructInput[this.id] = rowsInput;

        if (!rowsInput || !_.isArray(rowsInput))
            throw new TypeError('The input for instantiating Grid\'s rows needs to be a list of valid RowUrlConstruct objects');

        if (rowsInput.length < 1)
            throw new RangeError('The input for instantiating Grid\'s rows needs to consist of at least 1 valid RowUrlConstruct object');

        this.children = _.map(rowsInput, (row:RowUrlConstruct) => new Row(row));

        this.initialiser = initialiser;
    }

    // @TODO more unit tests
    static constructUrl(rows:RowUrlConstruct[]):GridUrlConstruct {
        if (!_.isArray(rows))
            throw new TypeError('The input for constructing Grid URL can only be a list of valid RowUrlConstruct objects');

        // @TODO also check if all children are indeed of type RowUrlConstruct?

        const id = shortid.generate();

        let resultingObject:GridUrlConstruct = {};

        resultingObject[id] = rows;

        return resultingObject;
    }

    static constructEmptyUrl():GridUrlConstruct {
        const
            rows = [Row.constructEmptyUrl()];

        return Grid.constructUrl(rows);
    }

    addRow(position:RowPosition, row:Row):Grid {
        switch (position) {
            case RowPosition.Above:
                this.children.unshift(row);
                break;
            case RowPosition.Below:
                this.children.push(row);
                break;
        }

        return this;
    }

    // @TODO test this, it's really easyyyyyy
    removeRow(removeRowId:string):Grid {
        let newChildren:Row[] = _.clone(this.children);

        // @TODO fail safe for when there is only one row left

        _.forEach(newChildren, (row:Row, key:number) => {
            if (row.id == removeRowId)
                delete newChildren[key];
        });

        this.children = _.filter(newChildren, _ => _);

        return this;
    }


    getConstructUrl():GridUrlConstruct {
        // go through all the children, concatenate into a single list and construct a grid
        const gridUrl:RowUrlConstruct[] = _.map(this.children, (row:Row) => row.getConstructUrl());

        return Grid.constructUrl(gridUrl);
    }
}