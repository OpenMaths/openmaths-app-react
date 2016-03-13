import * as React from 'react'
import { connect } from 'react-redux'

import { decodeGridUrl } from '../Grid/Url'

import { Grid, GridUrlConstruct } from '../Grid/Components/Grid'
import { Row, RowUrlConstruct } from '../Grid/Components/Row'
import { Column, ColumnConstructor } from '../Grid/Components/Column'

import GridElement from '../Grid/Elements/Grid'
import NavElement from '../Navigation/Nav'

interface IViewProps {
    // State => Props
    dispatch?:Redux.Dispatch;
    url?:string;
}

class View extends React.Component<IViewProps, {}> {
    // @TODO refactor to return !nextProps.url; and add a comment to explain
    shouldComponentUpdate(nextProps:IViewProps) {
        let shouldUpdate = true;

        if (nextProps.url)
            shouldUpdate = false;

        return shouldUpdate;
    }

    render() {
        let newGrid;

        const
            sideColLeft = Column.constructUrl(ColumnConstructor.Content, Grid.constructUrl([Row.constructUrl([Column.constructEmptyUrl()]), Row.constructUrl([Column.constructEmptyUrl()])])),
            middleCol = Column.constructUrl(ColumnConstructor.Content, Grid.constructUrl([Row.constructUrl([Column.constructEmptyUrl()]), Row.constructUrl([Column.constructUrl(ColumnConstructor.Content, 'w:User_interface')]), Row.constructUrl([Column.constructEmptyUrl()])])),
            sideColRight = Column.constructUrl(ColumnConstructor.Content, Grid.constructUrl([Row.constructUrl([Column.constructEmptyUrl()]), Row.constructUrl([Column.constructEmptyUrl()])]));

        const
            columnsUrl = [sideColLeft, middleCol, sideColRight],
            rowsUrl = [Row.constructUrl(columnsUrl)],
            gridUrl = Grid.constructUrl(rowsUrl);

        const urlComposer = this.props.url;

        if (urlComposer)
            newGrid = new Grid(decodeGridUrl(urlComposer));
        else
            newGrid = new Grid(gridUrl);

        return (
            <main id="app">
                <NavElement/>
                <GridElement layout={newGrid} parent={true}/>
            </main>
        );
    }
}

function select(state) {
    return {
        url: state.router.params.GridUrlConstructor
    };
}

export default connect(select)(View);