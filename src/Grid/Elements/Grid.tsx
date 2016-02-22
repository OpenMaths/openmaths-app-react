import * as React from 'react'
import * as _ from 'lodash'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { RowPosition } from '../DataModel'
import RowElement from './Row'

interface IGridProps {
    layout:Grid;
}

export default class GridElement extends React.Component<IGridProps, {}> {
    layout:Grid;

    componentWillMount() {
        this.layout = this.props.layout;
    }

    addRow(position:RowPosition, row:RowUrlConstruct) {
        const newUrl = this.layout.addRow(position, row);

        console.log(newUrl);
    }

    build() {
        const
            layout = this.layout,
            numberOfRows = layout.children.length;

        if (layout instanceof Grid) {
            return (
                <div className={'grid rows-' + numberOfRows} key={layout.id}>
                    {layout.children.map((row:Row) => <RowElement addRow={this.addRow.bind(this)} layout={row}
                                                                  key={row.id}/>)}
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