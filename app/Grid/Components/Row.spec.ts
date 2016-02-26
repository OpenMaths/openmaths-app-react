import * as _ from 'lodash'

import { ColumnPosition } from '../DataModel'

import { Grid } from './Grid'
import { Row } from './Row'
import { Column, ColumnConstructor, ColumnUrlConstruct } from './Column'

describe('Row component', () => {
    it('should parse its input correctly', () => {
        const columns = [
            Column.constructEmptyUrl(),
            Column.constructEmptyUrl(),
            Column.constructUrl(ColumnConstructor.Content, Grid.constructEmptyUrl())
        ];

        const
            rowUrl = Row.constructUrl(columns),
            RowComponent = new Row(rowUrl);

        expect(RowComponent.id).toEqual(_.first(_.keys(rowUrl)));

        expect(RowComponent.children.length).toBe(3);

        _.forEach(RowComponent.children, child => {
            expect(child instanceof Column).toBe(true);
        });
    });

    it('should correctly construct a url identifier', () => {
        const
            columns = [Column.constructEmptyUrl(), Column.constructEmptyUrl()],
            url = Row.constructUrl(columns);

        _.forEach(url, columns => {
            expect(columns.length).toEqual(2);
            expect(_.isArray(columns)).toBe(true)
        });
    });

    it('should correctly prepend a column', () => {
        let RowComponent = new Row(Row.constructEmptyUrl());

        expect(RowComponent.children.length).toEqual(1);

        const ColumnComponent = new Column(Column.constructEmptyUrl());

        RowComponent.addColumn(ColumnPosition.Prepend, ColumnComponent);

        expect(RowComponent.children.length).toEqual(2);

        const prependedColumn = _.first(RowComponent.children);

        expect(prependedColumn.id).toEqual(ColumnComponent.id);
    });

    it('should correctly append a column', () => {
        let RowComponent = new Row(Row.constructUrl([Column.constructEmptyUrl(), Column.constructEmptyUrl()]));

        expect(RowComponent.children.length).toEqual(2);

        const ColumnComponent = new Column(Column.constructEmptyUrl());

        RowComponent.addColumn(ColumnPosition.Append, ColumnComponent);

        expect(RowComponent.children.length).toEqual(3);

        const appendedColumn = _.last(RowComponent.children);

        expect(appendedColumn.id).toEqual(ColumnComponent.id);
    });
});