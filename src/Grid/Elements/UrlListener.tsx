import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnConstructor } from '../Components/Column'

import { triggerInitGrid } from '../Actions'
import { RowPosition, IRequestUpdateGrid } from '../DataModel'
import { encryptGridUrl, decryptGridUrl } from '../Url'

enum Action { InitialiseGrid, ReconstructGrid, ReconstructRow, ReconstructColumn }

interface IUrlListenerProps {
    dispatch?: Redux.Dispatch;
    GridUrlConstructor?:string;

    requestUpdateGrid?:IRequestUpdateGrid;
    requestInitGrid?:GridUrlConstruct;
}

class UrlListener extends React.Component<IUrlListenerProps, {}> {
    //url:GridUrlConstruct;

    //parseUrl(url:string) {
    //    if (this.url) {
    //        const oldUrl = this.url;
    //        this.url = decryptGridUrl(url);
    //
    //        //const whatHasChanged = oldUrl || this.url;
    //    } else {
    //        this.url = decryptGridUrl(url);
    //
    //        this.act(Action.InitialiseGrid);
    //    }
    //
    //    console.log(this.url);

    // Now determine what action to call.. Do we want to update only a Column, a Row, or a Grid element? All of these
    // should only subscribe to their own entities of the state, and only re-render themselves if deemed necessary
    //}

    act(action:Action, url:GridUrlConstruct) {
        switch (action) {
            case Action.InitialiseGrid:
                const G = new Grid(url);
                this.props.dispatch(triggerInitGrid(G));

                break;
            case Action.ReconstructGrid:
                break;
            case Action.ReconstructRow:
                //const R = new Row(this.url);
                //this.props.dispatch(reconstructRow(R));
                break;
            case Action.ReconstructColumn:
                //const C = new Column(this.url);
                //this.props.dispatch(reconstructColumn(C));
                break;
        }
    }

    componentWillReceiveProps(newProps:IUrlListenerProps) {
        if (newProps.requestInitGrid) {
            this.act(Action.InitialiseGrid, newProps.requestInitGrid);
        }
    }

    render() {
        return <div></div>;
    }
}

function select(state) {
    return {
        GridUrlConstructor: state.router.params.GridUrlConstructor,
        requestInitGrid: state.RequestGridReducer.requestInitGrid,
        requestUpdateGrid: state.RequestGridReducer.requestUpdateGrid
    };
}

export default connect(select)(UrlListener);