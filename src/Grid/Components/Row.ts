import * as _ from 'lodash'
import * as shortid from 'shortid'

import { ColumnPosition } from '../DataModel'

import { Column, ColumnConstructor, ColumnUrlConstruct } from './Column'

export interface RowUrlConstruct {
    [id:string]:ColumnUrlConstruct[]
}

export class Row {
    id:string;
    children:Column[];
    constructInput:RowUrlConstruct;

    constructor(input:RowUrlConstruct, initId?:string) {
        if (!input || !_.isObject(input) || _.isArray(input))
            throw new TypeError('The input of Row needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Row can only have one key, e.g. be of format {row: {...columns}}');

        const
            inputId = _.first(keys).toString(),
            columnsInput = input[inputId];

        this.id = initId ? initId : inputId;

        // Reconstruct the input with correct identifier
        this.constructInput = {};
        this.constructInput[this.id] = columnsInput;

        if (!columnsInput || !_.isArray(columnsInput))
            throw new TypeError('The input for instantiating Row\'s columns needs to be a list of valid ColumnUrlConstruct objects');

        if (columnsInput.length < 1)
            throw new RangeError('The input for instantiating Row\'s columns needs to consist of at least 1 valid ColumnUrlConstruct object');

        this.children = _.map(columnsInput, (column:ColumnUrlConstruct) => new Column(column));
    }

    // @TODO more unit tests
    // Change to constructURL
    static construct(columns:ColumnUrlConstruct[]):RowUrlConstruct {
        if (!_.isArray(columns))
            throw new TypeError('The input for constructing Row URL can only be a list of valid ColumnUrlConstruct objects');

        // @TODO also check if all children are indeed of type ColumnUrlConstruct?

        const id = shortid.generate();

        let resultingObject:RowUrlConstruct = {};

        resultingObject[id] = columns;

        return resultingObject;
    }

    addColumn(position:ColumnPosition, column:ColumnUrlConstruct):RowUrlConstruct {
        let columns = _.clone(this.constructInput[this.id]);

        switch (position) {
            case ColumnPosition.Prepend:
                columns.unshift(column);
                break;
            case ColumnPosition.Append:
                columns.push(column);
                break;
        }

        return Row.construct(columns);
    }
}