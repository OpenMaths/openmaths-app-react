import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import { Side } from '../../Utils/TouchesWindowBoundaries'

import { ColumnPosition, RowPosition } from '../DataModel'

interface IExpandIntoNewContainerElementProps {
    display:boolean;
    addRow:(position:RowPosition, insertId:string) => void;
    addColumn:(position:ColumnPosition, insertId:string) => void;

    // State => Props
    dispatch?:Redux.Dispatch;
    creatable?:Side;
    create?:Side;
    createId?:string;
}

class ExpandIntoNewContainerElement extends React.Component<IExpandIntoNewContainerElementProps, {}> {
    componentWillReceiveProps(nextProps:IExpandIntoNewContainerElementProps) {
        if (nextProps.create && !this.props.create) {
            debugger;
            switch (nextProps.create) {
                case Side.top:
                    this.props.addRow(RowPosition.Above, this.props.createId);
                    break;
                case Side.right:
                    this.props.addColumn(ColumnPosition.Append, this.props.createId);
                    break;
                case Side.bottom:
                    this.props.addRow(RowPosition.Below, this.props.createId);
                    break;
                case Side.left:
                    this.props.addColumn(ColumnPosition.Prepend, this.props.createId);
                    break;
            }
        }
    }

    build() {
        if (this.props.creatable && this.props.display) {
            switch (this.props.creatable) {
                case Side.top:
                    return <div className="creatable add-row top"></div>;
                case Side.right:
                    return <div className="creatable add-column right"></div>;
                case Side.bottom:
                    return <div className="creatable add-row bottom"></div>;
                case Side.left:
                    return <div className="creatable add-column left"></div>;
            }
        }

        return <div></div>;
    }

    render() {
        return this.build();
    }
}

function select(state) {
    return {
        creatable: state.UoIReducer.get('cellCreatableSide'),
        createId: state.UoIReducer.get('cellCreatableId'),
        create: state.UoIReducer.get('cellCreate'),
    };
}

export default connect(select)(ExpandIntoNewContainerElement);