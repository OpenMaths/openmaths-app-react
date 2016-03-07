import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'

import { UoIConstruct } from '../Components/UoI'

interface IExpandableIndicatorProps {
    layout:UoIConstruct;

    // State => Props
    dispatch?:Redux.Dispatch;
    insertable?:Immutable.Map<string,number>;
}

class ExpandableIndicator extends React.Component<IExpandableIndicatorProps, {}> {
    build() {
        if (this.props.insertable) {
            const
                x = this.props.insertable.get('x'),
                y = this.props.insertable.get('y');

            if (this.props.layout.isWithinBoundingBox(x, y)) {
                switch (this.props.layout.id) {
                    case null:
                        return <div className="expandable"></div>;
                    default:
                        return <div className="non-expandable"></div>;
                }
            }
        }

        return <div></div>;
    }

    render() {
        return this.build();
    }
}

function select(state) {
    return {
        insertable: state.UoIReducer.get('checkUoIInsertable')
    };
}

export default connect(select)(ExpandableIndicator);