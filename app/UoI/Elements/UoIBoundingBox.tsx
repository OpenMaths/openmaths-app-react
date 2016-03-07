import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import { connect } from 'react-redux'

let Ps:any = require('perfect-scrollbar');

import { UoI, UoIConstruct } from '../Components/UoI'
import UoIContent from './UoIContent'

interface IUoIBoundingBoxProps {
    layout:UoIConstruct;
    insertContent:(insertId:string) => void;

    // State => Props
    dispatch?:Redux.Dispatch;
    GridUrl?:string;
    InsertUoI?:Immutable.Map<string,any>;
}

class UoIBoundingBox extends React.Component<IUoIBoundingBoxProps, {}> {
    layout:UoIConstruct;

    measure() {
        let instanceEle = ReactDOM.findDOMNode(this);

        this.layout.position = instanceEle.getBoundingClientRect();
    }

    componentWillMount() {
        this.layout = this.props.layout;
    }

    componentDidMount() {
        this.measure();

        Ps.initialize(ReactDOM.findDOMNode(this), {
            suppressScrollX: false
        });
    }

    // This component should also be subscribed to a state which requests a UoI to be loaded inside a particular box
    // It should contain the x and y coordinates to determine whether the mouseup event has been triggered when hovering
    // over a current instance of a column. If yes, it should trigger an action which updates the corresponding column.
    // There should be a method attached to the property of a corresponding Column element that inserts new content into
    // it.
    componentWillReceiveProps(nextProps:IUoIBoundingBoxProps) {
        this.measure();

        // !this.layout.id condition ensures overriding if there is content already
        if (nextProps.InsertUoI && !this.layout.id) {
            const
                x:number = nextProps.InsertUoI.get('x'),
                y:number = nextProps.InsertUoI.get('y');

            if (this.layout.isWithinBoundingBox(x, y)) {
                const id:string = nextProps.InsertUoI.get('id');

                // Only if URL hasn't changed yet, otherwise death loop
                if (nextProps.GridUrl == this.props.GridUrl)
                    this.props.insertContent(id);
            }
        }
    }

    render() {
        return (
            <div className="uoi-bounding-box">
                <UoIContent layout={this.layout}/>
            </div>
        );
    }
}

function select(state) {
    return {
        GridUrl: state.router.params.GridUrlConstructor,
        InsertUoI: state.UoIReducer.get('InsertUoI')
    };
}

export default connect(select)(UoIBoundingBox);