import * as _ from 'lodash'

import { Row } from './Row'
import { Column, ColumnConstructor, ColumnUrlConstruct } from './Column'

describe('Row component', () => {
    it('should parse its input correctly', () => {
        const
            columns = [Column.construct(ColumnConstructor.Empty, null), Column.construct(ColumnConstructor.Empty, null), Column.construct(ColumnConstructor.Empty, null)],
            rowUrl = Row.construct(columns);

        const RowComponent = new Row(rowUrl);

        expect(RowComponent.id).toEqual(_.first(_.keys(rowUrl)));

        expect(RowComponent.children.length).toBe(3);

        _.forEach(RowComponent.children, child => {
            expect(child instanceof Column).toBe(true);
        });
    });

    it('should correctly construct a url identifier', () => {
        const
            columns = [Column.construct(ColumnConstructor.Empty, null)],
            url = Row.construct(columns);

        _.forEach(url, columns => expect(_.isArray(columns)).toBe(true));
    });
});