import * as React from 'react'

import Umi from '../../Umi/Umi'

import { Grid } from '../Components/Grid'
import { Column, ColumnUrlConstruct, ColumnConstructor } from '../Components/Column'
import UoI from '../../UoI/UoI'

import { ColumnPosition, SplitOperator } from '../DataModel'
import GridElement from './Grid'

interface IColumnProps {
    layout:Column;
    addColumn:(position:ColumnPosition, column:ColumnUrlConstruct) => void;
}

export default class ColumnElement extends React.Component<IColumnProps, {}> {
    layout:Column;

    componentWillMount() {
        this.layout = this.props.layout;
    }

    build() {
        const
            layout = this.props.layout,
            child = layout.child;

        const column = Column.construct(ColumnConstructor.Empty, null);

        if (child instanceof Grid) {
            return (
                <div className="column">
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Append, column)}>Append Column</strong>
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Prepend, column)}>Prepend Column</strong>

                    <GridElement layout={child}/>
                </div>
            );
        } else if (child instanceof UoI) {
            return (
                <div className="column">
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Append, column)}>Append Column</strong>
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Prepend, column)}>Prepend Column</strong>

                    <div>UoI</div>
                </div>
            );
        } else {
            console.error(layout);
            throw new TypeError('Unsupported instance');
        }
    }

    render() {
        return this.build();


        //const isSplit:SplitOperator = this.state['Split'];
        //
        //let Child:any;
        //
        //switch (isSplit) {
        //    case SplitOperator.Horizontally:
        //        Child = <Grid/>;
        //        break;
        //    case SplitOperator.Vertically:
        //        Child = <Grid/>;
        //        break;
        //    default:
        //        Child = <Umi/>;
        //        break;
        //}
        //
        //return (
        //    <div className="column">
        //        <div className="controls">
        //            <strong onClick={() => {this.props.addColumn(ColumnPosition.Prepend)}}>Prepend column</strong>
        //            <small>|</small>
        //            <strong onClick={() => {this.props.addColumn(ColumnPosition.Append)}}>Append column</strong>
        //            <small>|</small>
        //            <strong onClick={() => {this.split(SplitOperator.Horizontally)}}>Split Horizontally</strong>
        //            <small>|</small>
        //            <strong onClick={() => {this.split(SplitOperator.Vertically)}}>Split Vertically</strong>
        //        </div>
        //
        //        {Child}
        //    </div>
        //);
    }
}