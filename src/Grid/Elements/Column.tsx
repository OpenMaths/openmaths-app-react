import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Umi from '../../Umi/Umi'

import { Grid } from '../Components/Grid'
import { Column } from '../Components/Column'
import UoI from '../../UoI/UoI'
import UoIElement from '../../UoI/UoIElement'

import { RowPosition, ColumnPosition, SplitOperator } from '../DataModel'
import GridElement from './Grid'

interface IColumnElementProps {
    layout:Column;
    addRow:(position:RowPosition) => void;
    addColumn:(position:ColumnPosition) => void;
    splitColumn:(operator:SplitOperator, columnId:string, uoi:UoI) => void;
}

export default class ColumnElement extends React.Component<IColumnElementProps, {}> {
    layout:Column;

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            child = layout.child;

        if (child instanceof Grid) {
            return (
                <div className="column">
                    <GridElement layout={child}/>
                </div>
            );
        } else if (child instanceof UoI) {
            return (
                <div className="column">
                    <div className="controls">
                        <strong onClick={() => this.props.addRow(RowPosition.Above)}>
                            Insert Row Above
                        </strong>
                        <strong onClick={() => this.props.addRow(RowPosition.Below)}>
                            Insert Row Below
                        </strong>
                        <strong onClick={() => this.props.addColumn(ColumnPosition.Append)}>
                            Append Column
                        </strong>
                        <strong onClick={() => this.props.addColumn(ColumnPosition.Prepend)}>
                            Prepend Column
                        </strong>
                        <strong onClick={() => this.props.splitColumn(SplitOperator.Horizontally, layout.id, child)}>
                            Split Horizontally
                        </strong>
                        <strong onClick={() => this.props.splitColumn(SplitOperator.Vertically, layout.id, child)}>
                            Split Vertically
                        </strong>
                    </div>

                    <UoIElement layout={child}/>
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