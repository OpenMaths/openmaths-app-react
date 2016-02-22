import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { RowPosition } from '../DataModel'
import { decryptGridUrl } from '../Url'

import RowElement from './Row'

interface IGridProps {
    layout?:Grid;
    GridUrlConstructor?:string;
}

class GridElement extends React.Component<IGridProps, {}> {
    layout:Grid;

    componentWillMount() {
        this.layout = this.props.layout;
    }

    constructLayoutFromUrl():Grid {
        return new Grid(decryptGridUrl(this.props.GridUrlConstructor));
    }

    addRow(position:RowPosition, row:RowUrlConstruct) {
        const newUrl = this.layout.addRow(position, row);

        console.log(newUrl);
    }

    build() {
        const
            layout = this.layout ? this.layout : this.constructLayoutFromUrl(),
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
        return (this.props.layout || this.props.GridUrlConstructor) ? this.build() : <div></div>;
    }
}

function select(state) {
    return {
        GridUrlConstructor: state.router.params.GridUrlConstructor
    };
}

export default connect(select)(GridElement);