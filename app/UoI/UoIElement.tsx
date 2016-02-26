import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import UoI from './UoI'

interface IUoIElementProps {
    layout:UoI;

    // State => Props
    dispatch?:Redux.Dispatch;
    GridUrl?:string;
}

class UoIElement extends React.Component<IUoIElementProps, {}> {
    layout:UoI;

    measure() {
        let instanceEle = ReactDOM.findDOMNode(this);

        this.layout.position = instanceEle.getBoundingClientRect();
    }

    componentWillMount() {
        this.layout = this.props.layout;
    }

    componentDidMount() {
        this.measure();
    }

    componentWillReceiveProps() {
        this.measure();
    }

    render() {
        return <div>{this.layout.id ? this.layout.id : 'N/A (empty)'}</div>;
    }
}

function select(state) {
    return {
        GridUrl: state.router.params.GridUrlConstructor,
    };
}

export default connect(select)(UoIElement);