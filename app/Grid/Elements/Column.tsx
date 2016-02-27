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
    insertContent:(columnId:string, insertId:string) => void;

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

    // @TODO on insert content, there should be a modal which takes a callback as part of its argument list. The
    // callback method should be (insertId:string) => this.props.insertContent(layout.id, insertId)

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            child = layout.child,
            insertContent = (insertId:string) => this.props.insertContent(layout.id, insertId);

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
                        <strong onClick={() => this.props.insertContent(layout.id, '7')}>
                            Insert Content
                        </strong>
                    </div>

                    <UoIBoundingBox insertContent={insertContent} layout={child}/>
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