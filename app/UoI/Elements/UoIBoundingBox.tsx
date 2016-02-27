import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import UoI from '../Components/UoI'
import UoIContent from './UoIContent'

interface IUoIBoundingBoxProps {
    layout:UoI;

    // State => Props
    dispatch?:Redux.Dispatch;
    GridUrl?:string;
}

class UoIBoundingBox extends React.Component<IUoIBoundingBoxProps, {}> {
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
        return <div className="uoi-bounding-box"><UoIContent id={this.layout.id}/></div>;
    }
}

function select(state) {
    return {
        GridUrl: state.router.params.GridUrlConstructor
    };
}

export default connect(select)(UoIBoundingBox);