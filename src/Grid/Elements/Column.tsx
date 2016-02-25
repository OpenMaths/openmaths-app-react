import * as React from 'react'

import Umi from '../../Umi/Umi'

import { Grid } from '../Components/Grid'
import { Column } from '../Components/Column'
import UoI from '../../UoI/UoI'

import { ColumnPosition, SplitOperator } from '../DataModel'
import GridElement from './Grid'

interface IColumnProps {
    layout:Column;
    addColumn:(position:ColumnPosition) => void;
    splitColumn:(operator:SplitOperator, columnId:string, uoi:UoI) => void;
}

export default class ColumnElement extends React.Component<IColumnProps, {}> {
    layout:Column;

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            child = layout.child;

        if (child instanceof Grid) {
            return (
                <div className="column">
                    <div className="controls">
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Append)}>Append Column</strong>
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Prepend)}>Prepend Column</strong>
                    </div>

                    <GridElement layout={child}/>
                </div>
            );
        } else if (child instanceof UoI) {
            return (
                <div className="column">
                    <div className="controls">
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Append)}>Append Column</strong>
                    <strong onClick={() => this.props.addColumn(ColumnPosition.Prepend)}>Prepend Column</strong>
                    <strong onClick={() => this.props.splitColumn(SplitOperator.Horizontally, layout.id, child)}>Split Horizontally</strong>
                    <strong onClick={() => this.props.splitColumn(SplitOperator.Vertically, layout.id, child)}>Split Vertically</strong>
                    </div>

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