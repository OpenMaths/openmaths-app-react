import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'

let Ps:any = require('perfect-scrollbar');

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
    removeColumn:(columnId:string) => void;
    splitColumn:(operator:SplitOperator, columnId:string, uoi:UoI) => void;
    insertContent:(columnId:string, insertId:string) => void;

    // State => Props
    dispatch?:Redux.Dispatch;
}

class ColumnElement extends React.Component<IColumnElementProps, {}> {
    layout:Column;

    removeCell() {
        this.props.removeColumn(this.layout.id);
    }

    componentDidMount() {
        if (this.layout.child instanceof UoI) {
            if (_.isString(this.layout.child.id))
                this.props.dispatch(getUoIData(this.layout.child.id));
        }

        Ps.initialize(ReactDOM.findDOMNode(this.refs['controls']), {
            suppressScrollX: true
        });
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
                    <GridElement removeCell={() => this.removeCell()} layout={child}/>
                </div>
            );
        } else if (child instanceof UoI) {
            const hasContent = !_.isNull(layout.child.id);

            return (
                <div className="column">
                    <strong className="controls-boundaries top" onClick={() => this.props.addRow(RowPosition.Above)}>
                        <span>
                            <i className="fa fa-chevron-up"></i>
                        </span>
                    </strong>
                    <strong className="controls-boundaries right"
                            onClick={() => this.props.addColumn(ColumnPosition.Append)}>
                        <span>
                            <i className="fa fa-chevron-right"></i>
                        </span>
                    </strong>
                    <strong className="controls-boundaries bottom" onClick={() => this.props.addRow(RowPosition.Below)}>
                        <span>
                            <i className="fa fa-chevron-down"></i>
                        </span>
                    </strong>
                    <strong className="controls-boundaries left"
                            onClick={() => this.props.addColumn(ColumnPosition.Prepend)}>
                        <span>
                            <i className="fa fa-chevron-left"></i>
                        </span>
                    </strong>

                    <div className={hasContent ? 'controls-expandable' : 'controls-expandable center'} ref="controls">
                        <div className="controls-expandable-table-wrapper">
                            <div className={hasContent ? 'control info' : 'is-hidden'}
                                 onClick={() => this.props.insertContent(layout.id, '7')}>
                                <i className="fa fa-info"></i>
                                <span className="icon-label">Details</span>
                            </div>

                            <div className="control insert" onClick={() => this.props.insertContent(layout.id, '7')}>
                                <i className="fa fa-search"></i>
                                <span className="icon-label">Insert Content</span>
                            </div>

                            <div className="control edit"
                                 onClick={() => this.props.splitColumn(SplitOperator.Horizontally, layout.id, child)}>
                                <i className="fa fa-ellipsis-v offset-top"></i>
                                <span className="icon-label">Split Horizontally</span>
                            </div>

                            <div className="control edit"
                                 onClick={() => this.props.splitColumn(SplitOperator.Vertically, layout.id, child)}>
                                <i className="fa fa-ellipsis-h offset-top"></i>
                                <span className="icon-label">Split Vertically</span>
                            </div>

                            <div className={hasContent ? 'control remove' : 'is-hidden'}
                                 onClick={() => this.props.insertContent(layout.id, null)}>
                                <i className="fa fa-trash-o"></i>
                                <span className="icon-label">Remove Content</span>
                            </div>

                            <div className={!hasContent ? 'control remove' : 'is-hidden'}
                                 onClick={() => this.props.removeColumn(layout.id)}>
                                <i className="fa fa-trash-o"></i>
                                <span className="icon-label">Remove Cell</span>
                            </div>
                        </div>
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