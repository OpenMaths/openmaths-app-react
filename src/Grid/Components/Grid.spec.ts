import * as _ from 'lodash'

import { Grid } from './Grid'
import { Row } from './Row'
import { Column, ColumnConstructor } from './Column'

describe('Grid component', () => {
    it('should parse its input correctly', () => {
        const
            columns = [Column.construct(ColumnConstructor.Empty, null)],
            rows = [Row.construct(columns), Row.construct(columns)],
            gridUrl = Grid.construct(rows);

        const GridComponent = new Grid(gridUrl);

        expect(GridComponent.id).toEqual(_.first(_.keys(gridUrl)));

        expect(GridComponent.children.length).toBe(2);

        _.forEach(GridComponent.children, (child:Row) => {
            expect(child instanceof Row).toBe(true);
        });
    });

    it('should correctly construct a url identifier', () => {
        const
            columns = [Column.construct(ColumnConstructor.Empty, null)],
            rows = [Row.construct(columns)],
            url = Grid.construct(rows);

        _.forEach(url, rows => expect(_.isArray(rows)).toBe(true));
    });
});