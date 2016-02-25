import * as React from 'react'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

//import { encryptGridUrl } from '../Grid/Url'

import { Grid, GridUrlConstruct } from '../Grid/Components/Grid'
import { Row, RowUrlConstruct } from '../Grid/Components/Row'
import { Column, ColumnConstructor } from '../Grid/Components/Column'

import GridElement from '../Grid/Elements/Grid'
import UrlListener from '../Grid/Elements/UrlListener'

interface IViewProps {
    dispatch?: Redux.Dispatch;
}

class View extends React.Component<IViewProps, {}> {
    componentDidMount() {
        // @TODO this is here only for testing purposes, it creates a sample recursive grid with empty contents


        //
        //this.props.dispatch(tinyActions.navigateTo('/board/' + encryptGridUrl(gridUrl)));
    }

    render() {
        const
            columnsUrl = [Column.construct(ColumnConstructor.Content, Grid.constructEmpty())],
            rowsUrl = [Row.construct(columnsUrl)],
            gridUrl = Grid.construct(rowsUrl);

        const newGrid = new Grid(gridUrl);

        return (
            <div>
                <UrlListener/>
                <GridElement layout={newGrid}/>
            </div>
        );
    }
}

function select(state) {
    return {};
}

export default connect(select)(View);