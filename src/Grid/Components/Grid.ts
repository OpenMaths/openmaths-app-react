import * as _ from 'lodash'
import * as shortid from 'shortid'

import { Row, RowUrlConstruct } from './Row'
import { Column, ColumnConstructor } from './Column'

export interface GridUrlConstruct {
    [id:string]:RowUrlConstruct[]
}

export class Grid {
    id:string;
    children:Row[];

    constructor(input:GridUrlConstruct) {
        if (!input || !_.isObject(input) || _.isArray(input))
            throw new TypeError('The input of Grid needs to be a valid Object');

        const keys = _.keys(input);

        if (keys.length !== 1)
            throw new RangeError('Grid can only have one key, e.g. be of format {key: {...rows}}');

        this.id = _.first(keys).toString();

        const rowsInput = input[this.id];

        if (!rowsInput || !_.isArray(rowsInput))
            throw new TypeError('The input for instantiating Grid\'s rows needs to be a list of valid RowUrlConstruct objects');

        if (rowsInput.length < 1)
            throw new RangeError('The input for instantiating Grid\'s rows needs to consist of at least 1 valid RowUrlConstruct object');

        this.children = _.map(rowsInput, (row:RowUrlConstruct) => new Row(row));
    }

    // @TODO unit test
    static construct(rows:RowUrlConstruct[]):GridUrlConstruct {
        if (!_.isArray(rows))
            throw new TypeError('The input for constructing Grid URL can only be a list of valid RowUrlConstruct objects');

        // @TODO also check if all children are indeed of type RowUrlConstruct?

        const id = shortid.generate();

        let resultingObject:GridUrlConstruct = {};

        resultingObject[id] = rows;

        return resultingObject;
    }

    static constructEmpty():GridUrlConstruct {
        const
            columns = [Column.construct(ColumnConstructor.Empty, null)],
            rows = [Row.construct(columns)],
            grid = Grid.construct(rows);

        return grid;
    }
}