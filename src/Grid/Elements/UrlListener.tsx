import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnUrlConstruct, ColumnConstructor } from '../Components/Column'

//import { triggerInitGrid, triggerUpdateGrid, triggerUpdateRow } from '../Actions'
//import { RowPosition, IRequestUpdateGrid, IRequestUpdateRow } from '../DataModel'
//import { encryptGridUrl, decryptGridUrl } from '../Url'

interface IUrlListenerProps {
    // State => Props
    dispatch?: Redux.Dispatch;
    //RequestGridState:Immutable.Map<string,Grid>;
}

class UrlListener extends React.Component<IUrlListenerProps, {}> {
    componentWillReceiveProps(newProps:IUrlListenerProps) {
        //const
        //    requestInitGrid = newProps.RequestGridState.get('requestInitGrid'),
        //    requestUpdateGrid = newProps.RequestGridState.get('requestUpdateGrid');
        //
        //if (requestInitGrid) {
        //    console.debug('update grid! NOW');
        //    this.props.dispatch(triggerUpdateGrid(requestInitGrid));
        //}
        //
        //if (requestUpdateGrid) {
        //    console.debug('init grid! NOW');
        //    this.props.dispatch(triggerUpdateGrid(requestUpdateGrid));
        //}
    }

    render() {
        return <div></div>;
    }
}

function select(state) {
    return {
        //RequestGridState: state.RequestGridReducer
    };
}

export default connect(select)(UrlListener);