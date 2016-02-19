import * as _ from 'lodash'

import UoI from '../UoI/UoI'

export class Column {
    child;

    constructor(input) {
        const constructorInput = _.first(input);

        if (_.isArray(constructorInput)) {
            this.child = new Grid(constructorInput);
        } else {
            const id = constructorInput.toString();

            this.child = new UoI(id);
        }
    }
}

export class Row {
    children:Column[];

    constructor(columns) {
        this.children = _.map(columns, column => new Column(column));
    }
}

export class Grid {
    children:Row[];

    constructor(rows) {
        this.children = _.map(rows, row => new Row(row));
    }
}

export function parseToJson(url:string) {
    let parsed;

    try {
        parsed = JSON.parse(url);
    } catch (Exception) {
        console.error(Exception);
        parsed = null;
    }

    return parsed;
}