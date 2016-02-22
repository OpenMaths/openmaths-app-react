import * as React from 'react'
import * as _ from 'lodash'

import { GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnUrlConstruct, ColumnConstructor } from '../Components/Column'

import { ColumnPosition, RowPosition } from '../DataModel'
import ColumnElement from './Column'

interface IRowProps {
    layout:Row;
    //url:GridUrlConstruct;
    addRow:(position:RowPosition, row:RowUrlConstruct) => void;
}

export default class RowElement extends React.Component<IRowProps, {}> {
    layout:Row;

    componentWillMount() {
        this.layout = this.props.layout;
    }

    addColumn(position:ColumnPosition, column:ColumnUrlConstruct) {
        //const origUrl = this.props.url;

        //console.log(JSON.stringify(origUrl));
        //console.log(this.layout.id);

        //console.info(JSON.stringify(origUrl));
        //console.log(JSON.stringify(this.layout.constructInput));

        // returns a new row to be replaced based on this.layout.id
        const newRowUrl = this.layout.addColumn(position, column);

        //console.log(JSON.stringify(newRowUrl));
    }

    build() {
        const
            layout = this.layout,
            numberOfColumns = layout.children.length;

        const row = Row.construct([Column.construct(ColumnConstructor.Empty, null)]);

        if (layout instanceof Row) {
            return (
                <div className={'row columns-' + numberOfColumns}>
                    <strong onClick={() => this.props.addRow(RowPosition.Above, row)}>Insert Row Above</strong>
                    <strong onClick={() => this.props.addRow(RowPosition.Below, row)}>Insert Row Below</strong>

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