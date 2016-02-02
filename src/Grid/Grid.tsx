import * as React from 'react'
import * as _ from 'lodash'

import { RowPosition } from './DataModel'
import Row from './Row'

interface IGridProps {
    rows:number;
    columns:number;
    init?:any;
}

export default class Grid extends React.Component<IGridProps, {}> {
    rows = [];

    componentWillMount() {
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