import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid } from '../Components/Grid'
import { Row } from '../Components/Row'
import { Column } from '../Components/Column'

import { requestUpdateGrid } from '../Actions'
import { RowPosition } from '../DataModel'
import { encodeGridUrl } from '../Url'

import RowElement from './Row'

interface IGridProps {
    layout:Grid;
    parent?:boolean;

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

    addRow(position:RowPosition) {
        const
            newRow = new Row(Row.constructEmptyUrl()),
            newGrid = this.layout.addRow(position, newRow);

        this.props.dispatch(requestUpdateGrid(newGrid));
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
            addRow = this.addRow.bind(this),
            updateGrid = this.updateGrid.bind(this);

        if (layout instanceof Grid) {
            return (
                <div className={'grid rows-' + numberOfRows + (this.props.parent ? ' parent' : '')} key={layout.id}>
                    {_.map(layout.children, (row:Row) => <RowElement addRow={addRow} layout={row}
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
}

function select(state) {
    return {
        GridState: state.RequestGridReducer
    };
}

export default connect(select)(GridElement);