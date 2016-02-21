import * as React from 'react'
import * as _ from 'lodash'

import { RowPosition } from '../DataModel'
import Row from './Row'

import { Grid as GridComponent } from '../Components/Grid'
import { Row as RowComponent } from '../Components/Row'
import { Column as ColumnComponent, ColumnConstructor } from '../Components/Column'

interface IGridProps {
    rows:number;
    columns:number;
    init?:any;
}

export default class Grid extends React.Component<IGridProps, {}> {
    rows = [];

    componentWillMount() {
        const
            gridUrl = GridComponent.constructEmpty(),
            gridUrlString = JSON.stringify(gridUrl),
            parsedUrl = GridComponent.parseUrl(gridUrlString),
            constructedGrid = new GridComponent(parsedUrl);

        console.log(gridUrl);
        console.log(gridUrlString);
        console.log(parsedUrl);
        console.log(constructedGrid);

        const withNewRow = constructedGrid.addRow(RowComponent.construct([ColumnComponent.construct(ColumnConstructor.Empty, null)]));
        console.log(withNewRow);

        const
            rows = this.props.rows,
            columns = this.props.columns;

        for (let i = 0; i < rows; i++) {
            this.rows.push(<Row columns={columns} addRow={this.addRow.bind(this)}/>);
        }
    }

    addRow(position:RowPosition) {
        switch (position) {
            case RowPosition.Above:
                this.rows.unshift(<Row columns={1} addRow={this.addRow.bind(this)}/>);
                break;
            case RowPosition.Below:
                this.rows.push(<Row columns={1} addRow={this.addRow.bind(this)}/>);
                break;
        }

        console.log(this.rows);
    }

    render() {
        return (
            <div className={'grid rows-' + this.props.rows.toString()}>
                {_.forEach(this.rows, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}