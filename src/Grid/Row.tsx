import * as React from 'react'
import * as _ from 'lodash'

import { ColumnPosition, RowPosition } from './DataModel'
import Column from './Column'

interface IRowProps {
    columns:number;
    addRow: (position:RowPosition) => void;
}

export default class Row extends React.Component<IRowProps, {}> {
    columns = [];

    componentWillMount() {
        const columns = this.props.columns;

        for (let i = 0; i < columns; i++) {
            this.columns.push(<Column addColumn={this.addColumn.bind(this)}/>);
        }
    }

    addColumn(position:ColumnPosition) {
        switch (position) {
            case ColumnPosition.Append:
                this.columns.push(<Column addColumn={this.addColumn.bind(this)}/>);
                break;
            case ColumnPosition.Prepend:
                this.columns.unshift(<Column addColumn={this.addColumn.bind(this)}/>);
                break;
        }

        console.log(this.columns);
    }

    render() {
        return (
            <div className={'row columns-' + this.props.columns.toString()}>
                <div className="controls">
                    <strong onClick={() => {this.props.addRow(RowPosition.Above)}}>Insert Row Above</strong>
                    <small>|</small>
                    <strong onClick={() => {this.props.addRow(RowPosition.Below)}}>Insert Row Below</strong>
                </div>
                {_.forEach(this.columns, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}