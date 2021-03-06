import * as React from 'react'
import * as _ from 'lodash'

import { UoIConstruct } from '../../UoI/Components/UoI'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { ColumnPosition, RowPosition, SplitOperator } from '../DataModel'
import ColumnElement from './Column'

interface IRowElementProps {
    layout:Row;
    addRow:(position:RowPosition) => void;
    removeRow:(rowId:string) => void;
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

    // So this method should remove the cell with a column layout identifier. I think the best way to go about it would
    // be to iterate through all the columns, when an id matches, save that key and afterwards delete the element using
    // that key. Once removed, strip the remaining list from undefined, as this is what's left from a delete operation
    // performed on a list.
    removeColumn(columnId:string) {
        const newRow = this.layout.removeColumn(columnId);

        switch (newRow.children.length) {
            case 0:
                this.props.removeRow(this.layout.id);
                break;
            default:
                this.props.updateGrid(newRow);
                break;
        }
    }

    insertContent(columnId:string, insertId:string) {
        const
            newColumn = new Column(insertId ? Column.constructUrl(ColumnConstructor.Content, insertId) : Column.constructEmptyUrl()),
            newRow = this.layout.updateColumn(columnId, newColumn);

        this.props.updateGrid(newRow);
    }

    splitColumn(operator:SplitOperator, columnId:string, uoi:UoIConstruct) {
        const
            recreateColumnUrl = Column.constructUrl(ColumnConstructor.Content, uoi.constructId),
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
            splitColumn = this.splitColumn.bind(this),
            insertContent = this.insertContent.bind(this),
            removeColumn = this.removeColumn.bind(this);

        if (layout instanceof Row) {
            return (
                <div className={'row columns-' + numberOfColumns}>
                    {_.map(layout.children, (column:Column) => <ColumnElement addColumn={addColumn} layout={column}
                                                                              addRow={addRow} splitColumn={splitColumn}
                                                                              insertContent={insertContent}
                                                                              removeColumn={removeColumn}
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