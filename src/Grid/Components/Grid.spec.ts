import * as _ from 'lodash'

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

        _.forEach(gridUrl, rows => expect(_.isArray(rows)).toBe(true));
    });
});