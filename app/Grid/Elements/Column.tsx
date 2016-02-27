import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import Umi from '../../Umi/Umi'

import { Grid } from '../Components/Grid'
import { Column } from '../Components/Column'
import UoI from '../../UoI/Components/UoI'
import UoIBoundingBox from '../../UoI/Elements/UoIBoundingBox'
import { getUoIData } from '../../UoI/Actions'

import { RowPosition, ColumnPosition, SplitOperator } from '../DataModel'
import GridElement from './Grid'

interface IColumnElementProps {
    layout:Column;
    addRow:(position:RowPosition) => void;
    addColumn:(position:ColumnPosition) => void;
    splitColumn:(operator:SplitOperator, columnId:string, uoi:UoI) => void;

    // State => Props
    dispatch?:Redux.Dispatch;
}

class ColumnElement extends React.Component<IColumnElementProps, {}> {
    layout:Column;

    componentDidMount() {
        if (this.layout.child instanceof UoI) {
            if (_.isString(this.layout.child.id))
                this.props.dispatch(getUoIData(this.layout.child.id));
        }
    }

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

                    <UoIBoundingBox layout={child}/>
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

function select(state) {
    return {};
}

export default connect(select)(ColumnElement);