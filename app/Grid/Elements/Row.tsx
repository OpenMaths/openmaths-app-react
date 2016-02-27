import * as React from 'react'
import * as _ from 'lodash'

import UoI from '../../UoI/Components/UoI'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { ColumnPosition, RowPosition, SplitOperator } from '../DataModel'
import ColumnElement from './Column'

interface IRowElementProps {
    layout:Row;
    addRow:(position:RowPosition) => void;
    updateGrid:(newRow:Row) => void;
}

export default class RowElement extends React.Component<IRowElementProps, {}> {
    layout:Row;

    addColumn(position:ColumnPosition) {
        const
            newColumn = new Column(Column.constructEmptyUrl()),
            newRow = this.layout.addColumn(position, newColumn);

        this.props.updateGrid(newRow);
    }

    splitColumn(operator:SplitOperator, columnId:string, uoi:UoI) {
        const
            recreateColumnUrl = Column.constructUrl(ColumnConstructor.Content, uoi.id),
            emptyColumnUrl = Column.constructEmptyUrl();

        let newColumnContent:GridUrlConstruct;

        switch (operator) {
            case SplitOperator.Horizontally:
                // if the operator is 'Horizontally', change the correspondent child into a grid of 2 rows, 1 column, populate
                // the first row's column with the content coming from the child
                newColumnContent = Grid.constructUrl(
                    [Row.constructUrl([recreateColumnUrl]), Row.constructUrl([emptyColumnUrl])]
                );

                break;
            case SplitOperator.Vertically:
                // if the operator is 'Vertically', change the correspondent child into a grid of 1 row, 2 columns, populate the
                // row's first column with content coming from the child
                newColumnContent = Grid.constructUrl(
                    [Row.constructUrl([recreateColumnUrl, emptyColumnUrl])]
                );

                break;
        }

        const
            newColumn = new Column(Column.constructUrl(ColumnConstructor.Content, newColumnContent)),
            newRow = this.layout.updateColumn(columnId, newColumn);

        this.props.updateGrid(newRow);
    }

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            numberOfColumns = layout.children.length,
            addRow = this.props.addRow,
            addColumn = this.addColumn.bind(this),
            splitColumn = this.splitColumn.bind(this);

        if (layout instanceof Row) {
            return (
                <div className={'row columns-' + numberOfColumns}>
                    {_.map(layout.children, (column:Column) => <ColumnElement addColumn={addColumn} layout={column}
                                                                              addRow={addRow} splitColumn={splitColumn}
                                                                              key={column.id}/>)}
                </div>
            );
        } else {
            console.error(layout);
            throw new TypeError('Unsupported instance');
        }
    }

    render() {
        return this.build();
    }
}