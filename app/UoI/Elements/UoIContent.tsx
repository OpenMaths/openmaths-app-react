import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import UoI from '../Components/UoI'

interface IUoIContentProps {
    id:string;

    // State => Props
    dispatch?:Redux.Dispatch;
    UoI?:UoI;
}

class UoIContent extends React.Component<IUoIContentProps, {}> {
    layout:UoI;

    shouldComponentUpdate(nextProps:IUoIContentProps) {
        let shouldUpdate = true;

        if (nextProps.UoI && nextProps.UoI.id == this.props.id)
            this.layout = nextProps.UoI;
        else
            shouldUpdate = false;

        return shouldUpdate;
    }

    render() {
        return <article>{this.layout && this.layout.id ? this.layout.id : 'N/A (empty)'}</article>;
    }
}

function select(state) {
    return {
        UoI: state.UoIReducer.get('UoI')
    };
}

export default connect(select)(UoIContent);