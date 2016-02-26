import * as _ from 'lodash'

import { RowPosition } from '../DataModel'

import { Grid } from './Grid'
import { Row } from './Row'
import { Column, ColumnConstructor } from './Column'

describe('Grid component', () => {
    it('should parse its input correctly', () => {
        const
            rows = [Row.constructEmptyUrl(), Row.constructEmptyUrl()],
            gridUrl = Grid.constructUrl(rows);

        const GridComponent = new Grid(gridUrl);

        expect(GridComponent.id).toEqual(_.first(_.keys(gridUrl)));

        expect(GridComponent.children.length).toBe(2);

        _.forEach(GridComponent.children, (child:Row) => {
            expect(child instanceof Row).toBe(true);
        });
    });

    it('should correctly construct a url identifier', () => {
        const
            gridUrl = Grid.constructEmptyUrl();

        _.forEach(gridUrl, rows => {
            expect(rows.length).toEqual(1);
            expect(_.isArray(rows)).toBe(true);
        });
    });

    it('should correctly insert a row above', () => {
        let GridComponent = new Grid(Grid.constructEmptyUrl());

        expect(GridComponent.children.length).toEqual(1);

        const RowComponent = new Row(Row.constructEmptyUrl());

        GridComponent.addRow(RowPosition.Above, RowComponent);

        expect(GridComponent.children.length).toEqual(2);

        const theRowAbove = _.first(GridComponent.children);

        expect(theRowAbove.id).toEqual(RowComponent.id);
    });

    it('should correctly insert a row below', () => {
        let GridComponent = new Grid(Grid.constructUrl([Row.constructEmptyUrl(), Row.constructEmptyUrl()]));

        expect(GridComponent.children.length).toEqual(2);

        const RowComponent = new Row(Row.constructEmptyUrl());

        GridComponent.addRow(RowPosition.Below, RowComponent);

        expect(GridComponent.children.length).toEqual(3);

        const theRowBelow = _.last(GridComponent.children);

        expect(theRowBelow.id).toEqual(RowComponent.id);
    });
});