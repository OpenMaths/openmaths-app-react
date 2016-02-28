import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import * as key from 'keymaster'

import Umi from '../../Umi/Umi'

import { Grid } from '../Components/Grid'
import { Column } from '../Components/Column'
import UoI from '../../UoI/Components/UoI'
import UoIBoundingBox from '../../UoI/Elements/UoIBoundingBox'
import { getUoIData, toggleUoIGridControls } from '../../UoI/Actions'

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
    openUoIGridControls?:string;
}

class ColumnElement extends React.Component<IColumnElementProps, {}> {
    layout:Column;

    toggleGridOptions() {
        this.props.dispatch(toggleUoIGridControls(this.layout.id));
    }

    shouldComponentUpdate(nextProps:IColumnElementProps) {
        let shouldUpdate = true;

        if (nextProps.openUoIGridControls)
            shouldUpdate = nextProps.openUoIGridControls == this.layout.id;

        return shouldUpdate;
    }

    componentDidMount() {
        if (this.layout.child instanceof UoI) {
            if (_.isString(this.layout.child.id))
                this.props.dispatch(getUoIData(this.layout.child.id));
        }

        key('esc', () => this.props.dispatch(toggleUoIGridControls(null)));
    }

    componentWillUnmount() {
        key.unbind('esc');
    }

    // @TODO on insert content, there should be a modal which takes a callback as part of its argument list. The
    // callback method should be (insertId:string) => this.props.insertContent(layout.id, insertId)

    build() {
        this.layout = this.props.layout;

        const
            layout = this.layout,
            child = layout.child,
            controlsClass = this.props.openUoIGridControls && this.props.openUoIGridControls == this.layout.id ? 'controls' : 'controls is-hidden',
            columnClass = this.props.openUoIGridControls && this.props.openUoIGridControls == this.layout.id ? 'column blur' : 'column',
            insertContent = (insertId:string) => this.props.insertContent(layout.id, insertId);

        if (child instanceof Grid) {
            return (
                <div className="column">
                    <GridElement layout={child}/>
                </div>
            );
        } else if (child instanceof UoI) {
            return (
                <div className={columnClass}>
                    <div className="controls-toggler" onClick={() => {this.toggleGridOptions()}}>
                        <i></i>
                    </div>

                    <ul className={controlsClass}>
                        <li>
                            <small className="action" onClick={() => this.props.addRow(RowPosition.Above)}>
                                <i className="fa fa-chevron-up"></i>
                            </small>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <small className="action"
                                           onClick={() => this.props.addColumn(ColumnPosition.Prepend)}>
                                        <i className="fa fa-chevron-left"></i>
                                    </small>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <small className="action"
                                                   onClick={() => this.props.insertContent(layout.id, '7')}>
                                                <i className="fa fa-plus-square-o"></i>
                                                Add Content
                                            </small>
                                        </li>
                                        <li>
                                            <small className="action"
                                                   onClick={() => this.props.splitColumn(SplitOperator.Horizontally, layout.id, child)}>
                                                <i className="fa fa-arrows-v"></i>
                                                Split Horizontally
                                            </small>
                                        </li>
                                        <li>
                                            <small className="action"
                                                   onClick={() => this.props.splitColumn(SplitOperator.Vertically, layout.id, child)}>
                                                <i className="fa fa-arrows-h"></i>
                                                Split Vertically
                                            </small>
                                        </li>
                                        <li>
                                            <small className="action"
                                                   onClick={() => this.props.insertContent(layout.id, null)}>
                                                <i className="fa fa-trash-o"></i>
                                                Remove Content
                                            </small>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <small className="action"
                                           onClick={() => this.props.addColumn(ColumnPosition.Append)}>
                                        <i className="fa fa-chevron-right"></i>
                                    </small>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <small className="action" onClick={() => this.props.addRow(RowPosition.Below)}>
                                <i className="fa fa-chevron-down"></i>
                            </small>
                        </li>
                    </ul>

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
    return {
        openUoIGridControls: state.UoIReducer.get('openUoIGridControls')
    };
}

export default connect(select)(ColumnElement);