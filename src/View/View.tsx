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
    //this.props.dispatch(tinyActions.navigateTo('/board/' + encryptGridUrl(gridUrl)));

    render() {
        const
            columnsUrl = [Column.constructUrl(ColumnConstructor.Content, Grid.constructEmptyUrl())],
            rowsUrl = [Row.constructUrl(columnsUrl)],
            gridUrl = Grid.constructUrl(rowsUrl);

        const newGrid = new Grid(gridUrl);

        return (
            <div>
                <UrlListener/>
                <GridElement layout={newGrid} parent={true}/>
            </div>
        );
    }
}

function select(state) {
    return {};
}

export default connect(select)(View);