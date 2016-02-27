import * as _ from 'lodash'

import UoI from '../../UoI/Components/UoI'

import { Grid } from './Grid'
import { Row } from './Row'
import { Column, ColumnConstructor } from './Column'

describe('Column component', () => {
    it('should parse its input correctly', () => {
        const columnUrl = Column.constructUrl(ColumnConstructor.Content, 'identifier');

        const ColumnComponent = new Column(columnUrl);

        expect(ColumnComponent.id).toEqual(_.first(_.keys(columnUrl)));

        expect(ColumnComponent.child instanceof UoI).toBe(true);
    });

    it('should parse its recurring input correctly', () => {
        const columnUrl = Column.constructUrl(ColumnConstructor.Content, Grid.constructEmptyUrl());

        const ColumnComponent = new Column(columnUrl);

        expect(ColumnComponent.id).toEqual(_.first(_.keys(columnUrl)));

        expect(ColumnComponent.child instanceof Grid).toBe(true);
    });

    it('should correctly construct an "empty column" url identifier', () => {
        const
            obj = Column.constructUrl(ColumnConstructor.Empty, null),
            val = _.first(_.values(obj));

        expect(val).toBeNull();
    });

    it('should correctly construct a "column with content" url identifier', () => {
        const
            obj = Column.constructUrl(ColumnConstructor.Content, 'identifier'),
            val = _.first(_.values(obj));

        expect(val).toEqual('identifier');
    });
});