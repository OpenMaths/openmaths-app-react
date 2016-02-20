import * as _ from 'lodash'
import expect = require('expect.js')

import UoI from '../UoI/UoI'
import { parseToJson, Grid, Row, Column } from './UrlGenerator'

describe('GridUrlGenerator', () => {
    // BASE ASSUMPTIONS

    // A Grid can only consist of Rows
    // A Row can only consist of Columns
    // A Column can only consist of a UoI, or a Grid

    it('should properly parse [[["1"]]]', () => {
        const
            input = '[[["1"]]]',
            output = [[["1"]]];

        expect(JSON.stringify(parseToJson(input))).to.equal(JSON.stringify(output));
    });

    const GridsToTest = {
        //input: [[["1"]]],
        //input: [[["2e"]], [["n"]]],
        //input: [[["2e"]], [["n"]], []],
        //input: []
    };

    it('should properly construct the children of a Grid', () => {
        const
            input = [[["1"]]],
            initGrid = new Grid(input);

        expect(initGrid.children.length).to.equal(1);

        _.forEach(initGrid.children, (child:Row) => {
            expect(child instanceof Row).to.be(true);
        });
    });

    it('should properly construct the children of a Row', () => {
        const
            input = [["1"], [[[["1"]]]]],
            initRow = new Row(input);

        expect(initRow.children.length).to.equal(2);
    });

    it('should properly construct the child of a Column', () => {
        const
            input = ["1"],
            initColumn = new Column(input),
            child:UoI = initColumn.child;

        expect(child.id).to.equal('1');
    });
});