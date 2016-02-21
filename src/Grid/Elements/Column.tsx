import * as React from 'react'

import Umi from '../../Umi/Umi'

import { ColumnPosition, SplitOperator } from '../DataModel'
import Grid from './Grid'

interface IColumnProps {
    addColumn: (position:ColumnPosition) => void;
}

interface IColumnState {
    Split:SplitOperator;
}

export default class Column extends React.Component<IColumnProps, IColumnState> {
    // There should be an actions component that takes in a config object describing the available actions and the
    // methods bound

    componentWillMount() {
        this.setState({Split: null});
    }

    split(operator:SplitOperator) {
        this.setState({Split: operator});
    }

    render() {
        const isSplit:SplitOperator = this.state['Split'];

        let Child:any;

        switch (isSplit) {
            case SplitOperator.Horizontally:
                Child = <Grid rows={2} columns={1}/>;
                break;
            case SplitOperator.Vertically:
                Child = <Grid rows={1} columns={2}/>;
                break;
            default:
                Child = <Umi/>;
                break;
        }

        return (
            <div className="column">
                <div className="controls">
                    <strong onClick={() => {this.props.addColumn(ColumnPosition.Prepend)}}>Prepend column</strong>
                    <small>|</small>
                    <strong onClick={() => {this.props.addColumn(ColumnPosition.Append)}}>Append column</strong>
                    <small>|</small>
                    <strong onClick={() => {this.split(SplitOperator.Horizontally)}}>Split Horizontally</strong>
                    <small>|</small>
                    <strong onClick={() => {this.split(SplitOperator.Vertically)}}>Split Vertically</strong>
                </div>

                {Child}
            </div>
        );
    }
}