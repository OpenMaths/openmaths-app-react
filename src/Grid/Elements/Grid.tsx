import * as React from 'react'
import * as _ from 'lodash'

import { RowPosition } from '../DataModel'
import Row from './Row'

import GridComponent from '../Components/Grid'

interface IGridProps {
    rows:number;
    columns:number;
    init?:any;
}

const URL = '{"a":{"b":{"d":"content_id_a","e":null},"c":{"f":null,"g":{"i":{"j":{"k":"content_id_b"}}},"h":null}}}';

export default class Grid extends React.Component<IGridProps, {}> {
    rows = [];

    componentWillMount() {
        let parsedUrl;

        try {
            parsedUrl = JSON.parse(URL);
        } catch (Exception) {
            console.error(Exception);
            parsedUrl = null;
        }

        //const GridTest = new GridComponent(parsedUrl);
        //console.log(GridTest);

        GridComponent.constructEmpty();

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