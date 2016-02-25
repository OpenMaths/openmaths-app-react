import * as React from 'react'
import * as _ from 'lodash'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnUrlConstruct, ColumnConstructor } from '../Components/Column'

import { ColumnPosition, RowPosition } from '../DataModel'
import ColumnElement from './Column'

interface IRowProps {
    layout:Row;
    addRow:(position:RowPosition) => void;
    updateGrid:(newRow:Row) => void;
}

export default class RowElement extends React.Component<IRowProps, {}> {
    layout:Row;

    addColumn(position:ColumnPosition) {
        const
            newColumn = new Column(Column.construct(ColumnConstructor.Empty, null)),
            newRow = this.layout.addColumnN(position, newColumn);

        this.props.updateGrid(newRow);
    }

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            numberOfColumns = layout.children.length;

        if (layout instanceof Row) {
            return (
                <div className={'row columns-' + numberOfColumns}>
                    <strong onClick={() => this.props.addRow(RowPosition.Above)}>Insert Row Above</strong>
                    <strong onClick={() => this.props.addRow(RowPosition.Below)}>Insert Row Below</strong>

                    {layout.children.map((column:Column) => <ColumnElement addColumn={this.addColumn.bind(this)}
                                                                           layout={column} key={column.id}/>)}
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