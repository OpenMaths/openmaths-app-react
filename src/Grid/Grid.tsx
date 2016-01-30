import * as React from 'react'
import * as _ from 'lodash'

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
            this.rows.push(<Row columns={columns}/>);
        }
    }

    addRow() {
        this.rows.push(<Row columns={1}/>);

        console.log(this.rows);
    }

    render() {
        return (
            <div className={'grid rows-' + this.props.rows.toString()}>
                <div className="controls">
                    <strong onClick={() => {this.addRow()}}>Insert row above</strong>
                    <small>|</small>
                    <strong onClick={() => {this.addRow()}}>Insert row below</strong>
                </div>

                {_.forEach(this.rows, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}