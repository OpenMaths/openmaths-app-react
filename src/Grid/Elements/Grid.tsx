import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { requestUpdateGrid } from '../Actions'
import { RowPosition } from '../DataModel'
import { encryptGridUrl, decryptGridUrl } from '../Url'

import RowElement from './Row'

interface IGridProps {
    dispatch?: Redux.Dispatch;
    layout?:Grid;
    triggerInitGrid?:Grid;
}

class GridElement extends React.Component<IGridProps, {}> {
    layout:Grid;
    //url:GridUrlConstruct;

    componentWillMount() {
    }

    //constructLayoutFromUrl():Grid {
    //    return new Grid(this.url);
    //}

    addRow(position:RowPosition, row:RowUrlConstruct) {
        const newUrl = this.layout.addRow(position, row);

        // This should trigger an action called requestUpdateGrid with the corresponding Id and new Row Url Constructor
        this.props.dispatch(requestUpdateGrid(this.layout.id, newUrl));
    }

    build() {
        if (!this.props.layout && !this.props.triggerInitGrid)
            return <div></div>;

        this.layout = this.props.layout ? this.props.layout : this.props.triggerInitGrid;

        const
            layout = this.layout,
            numberOfRows = layout.children.length;

        if (layout instanceof Grid) {
            return (
                <div className={'grid rows-' + numberOfRows} key={layout.id}>
                    {layout.children.map((row:Row) => <RowElement addRow={this.addRow.bind(this)} layout={row}
                                                                  key={row.id}/>)}
                </div>
            );
        } else {
            console.error(layout);
            throw new TypeError('Unsupported instance');
        }
    }

    render() {
        return this.props.triggerInitGrid ? this.build() : <div></div>;
    }
}

function select(state) {
    return {
        triggerInitGrid: state.TriggerGridReducer.triggerInitGrid
    };
}

export default connect(select)(GridElement);