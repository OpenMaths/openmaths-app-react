import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { tinyActions } from 'redux-tiny-router'

import { Grid, GridUrlConstruct } from '../Components/Grid'
import { Row, RowUrlConstruct } from '../Components/Row'
import { Column, ColumnUrlConstruct, ColumnConstructor } from '../Components/Column'

import { requestUpdateGrid } from '../Actions'
import { decodeGridUrl } from '../Url'

interface IUrlListenerProps {
    // State => Props
    dispatch?: Redux.Dispatch;
    url?:string;
}

class UrlListener extends React.Component<IUrlListenerProps, {}> {
    componentDidMount() {
        const urlComposer = this.props.url;

        if (urlComposer) {
            const layout = new Grid(decodeGridUrl(urlComposer), true);

            console.debug('About to initialise new Grid');
            this.props.dispatch(requestUpdateGrid(layout));
        }
    }

    render() {
        return <div></div>;
    }
}

function select(state) {
    return {
        //url: state.router.params.GridUrlConstructor
    };
}

export default connect(select)(UrlListener);