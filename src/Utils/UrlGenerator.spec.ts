import * as _ from 'lodash'
import expect = require('expect.js')

import UoI from '../UoI/UoI'
import { parseToJson, Grid, Row, Column } from './UrlGenerator'

describe('GridUrlGenerator', () => {
    // A Grid can only consist of Rows
    //it('Should properly construct a');

    // A Row can only consist of Columns

    // A Column can only consist of a UoI, or a Grid

    // {[{}],[[1,2]],[[{[[3]]}]]}

    it('should properly parse [[[1]]]', () => {
        const
            input = '[[[1]]]',
            output = [[[1]]];

        expect(JSON.stringify(parseToJson(input))).to.equal(JSON.stringify(output));
    });

    it('should properly construct the children of a Grid', () => {
        const
            input = '[[[1]]]',
            initGrid = new Grid(parseToJson(input));

        expect(initGrid.children.length).to.equal(1);
    });

    it('should properly construct the children of a Row', () => {
        const
            input = [[1]],
            initRow = new Row(input);

        expect(initRow.children.length).to.equal(1);
    });

    it('should properly construct the child of a Column', () => {
        const
            input = [1],
            initColumn = new Column(input),
            child:UoI = initColumn.child;

        expect(child.id).to.equal('1');
    });
});