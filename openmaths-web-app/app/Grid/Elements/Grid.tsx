import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { touchesWindowBoundaries, Side } from '../../Utils/TouchesWindowBoundaries'

import { requestUoIToBeInserted, checkUoIInsertable, disposeUoIInsertable,
    requestCellCreatable, confirmIfCellCreatable } from '../../UoI/Actions'

import { Grid } from '../Components/Grid'
import { Row } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { requestUpdateGrid } from '../Actions'
import { RowPosition, ColumnPosition } from '../DataModel'
import { encodeGridUrl } from '../Url'

import RowElement from './Row'
import ExpandIntoNewContainerElement from './ExpandIntoNewContainerElement'

interface IGridProps {
    layout:Grid;
    parent?:boolean;
    removeCell?:() => void;

    // State => Props
    dispatch?:Redux.Dispatch;
    GridState?:Immutable.Map<string,Grid>;
}

class GridElement extends React.Component<IGridProps, {}> {
    layout:Grid;

    updateGrid(newRow:Row) {
        _.forEach(this.layout.children, (row:Row, key:number) => {
            if (row.id == newRow.id)
                this.layout.children[key] = newRow;
        });

        const newGrid = this.layout;

        this.props.dispatch(requestUpdateGrid(newGrid));
    }

    addRow(position:RowPosition, insertId?:string) {
        const
            columnConstructor = insertId ? Column.constructUrl(ColumnConstructor.Content, insertId) : Column.constructEmptyUrl(),
            newRow = new Row(Row.constructUrl([columnConstructor])),
            newGrid = this.layout.addRow(position, newRow);

        this.props.dispatch(requestUpdateGrid(newGrid));
    }

    addRowWithContent(position:RowPosition, insertId:string) {
        this.addRow(position, insertId);
    }

    addColumnWithContent(position:ColumnPosition, insertId:string) {
        let row:Row = _.first(this.layout.children);

        const updatedRow = row.addColumn(position, new Column(Column.constructUrl(ColumnConstructor.Content, insertId)));

        this.updateGrid(updatedRow);
    }

    removeRow(rowId:string) {
        const newGrid = this.layout.removeRow(rowId);

        switch (newGrid.children.length) {
            case 0:
                if (this.props.parent)
                    this.addRow(RowPosition.Below);
                else
                    this.props.removeCell();
                break;
            default:
                this.props.dispatch(requestUpdateGrid(newGrid));
                break;
        }
    }

    shouldComponentUpdate(nextProps:IGridProps) {
        let shouldUpdate = true;

        const
            requestUpdateGrid:Grid = nextProps.GridState.get('requestUpdateGrid');

        if (this.props.parent) {
            const encodedUrl = encodeGridUrl(this.layout.getConstructUrl());

            this.props.dispatch(tinyActions.changeUrl('/board/' + encodedUrl));
        }

        if (requestUpdateGrid) {
            shouldUpdate = requestUpdateGrid.id == this.layout.id;

            if (shouldUpdate)
                this.layout = requestUpdateGrid;
        }

        return shouldUpdate;
    }

    build() {
        this.layout = this.layout ? this.layout : this.props.layout;

        const
            layout = this.layout,
            numberOfRows = layout.children.length,
            addRowWithContent = this.addRowWithContent.bind(this),
            addColumnWithContent = this.addColumnWithContent.bind(this),
            addRow = this.addRow.bind(this),
            removeRow = this.removeRow.bind(this),
            updateGrid = this.updateGrid.bind(this);

        if (layout instanceof Grid) {
            return (
                <div className={'grid rows-' + numberOfRows + (this.props.parent ? ' parent' : '')} key={layout.id}>
                    <ExpandIntoNewContainerElement display={this.props.parent} addRow={addRowWithContent}
                                                   addColumn={addColumnWithContent}/>

                    {_.map(layout.children, (row:Row) => <RowElement addRow={addRow} layout={row} removeRow={removeRow}
                                                                     updateGrid={updateGrid} key={row.id}/>)}
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

    componentDidMount() {
        let x:number, y:number, id:string, subscription, instanceEle = ReactDOM.findDOMNode(this);

        const dispatch = this.props.dispatch;

        if (this.props.parent) {
            instanceEle.addEventListener('mousedown', mousedown);
        }

        function mousedown(event:any) {
            x = event.pageX;
            y = event.pageY;

            if (event.target.tagName.toLowerCase() == 'a') {
                event.preventDefault();

                console.log(event);

                const
                    classList = event.target.classList,
                    containsExpandId = _.includes(classList, 'expand-uoi');

                // @TODO a nicer way of doing this?
                if (containsExpandId) {
                    event.preventDefault();

                    const attributes = event.target.attributes;

                    id = attributes['expand-id'].value;

                    let w:any = window;

                    subscription = Rx.Observable
                        .fromEvent(w, 'mousemove')
                        .debounce(250)
                        .map((e:any) => {
                            const windowBoundingRect = document
                                .getElementById('OpenMathsAppContainer')
                                .getBoundingClientRect();

                            dispatch(checkUoIInsertable(e.clientX, e.clientY));

                            // Hack to reset Cell Creatable UI helper (the green dashed border box)
                            dispatch(requestCellCreatable(null, null));

                            return touchesWindowBoundaries(windowBoundingRect, e.clientX, e.clientY);
                        })
                        .filter((s:Side) => !_.isNull(s))
                        .finally(() => {
                            dispatch(disposeUoIInsertable());
                            dispatch(confirmIfCellCreatable());
                        })
                        .subscribe((touches:Side) => {
                            dispatch(disposeUoIInsertable());
                            dispatch(requestCellCreatable(touches, id));
                        });

                    window.addEventListener('mousemove', mousemove);
                    window.addEventListener('mouseup', mouseup);
                }
            }
        }

        function mousemove(event:any) {
            x = event.clientX;
            y = event.clientY;
        }

        function mouseup() {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);

            subscription.dispose();

            // @TODO investigate if delay is necessary here
            dispatch(requestUoIToBeInserted(x, y, id));
        }
    }
}

function select(state) {
    return {
        GridState: state.RequestGridReducer
    };
}

export default connect(select)(GridElement);