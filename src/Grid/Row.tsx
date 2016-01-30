import * as React from 'react'
import * as _ from 'lodash'
import Column from './Column'

interface IRowProps {
    columns:number;
}

export default class Row extends React.Component<IRowProps, {}> {
    // There should be an actions component that takes in a config object describing the available actions and the
    // methods bound

    // A property which holds the information about rows

    // Add row above => inherited from the parent
    // Add row below => inherited from the parent

    // Add column left?
    // Add column right?

    columns = [];

    componentWillMount() {
        const columns = this.props.columns;

        for (let i = 0; i < columns; i++) {
            this.columns.push(<Column/>);
        }
    }

    addColumn() {
        this.columns.push(<Column/>);

        console.log(this.columns);
    }

    render() {
        return (
            <div className={'row columns-' + this.props.columns.toString()}>
                <div className="controls">
                    <strong onClick={() => {this.addColumn()}}>prepend column</strong>
                    <small>|</small>
                    <strong onClick={() => {this.addColumn()}}>append column</strong>
                </div>
                {_.forEach(this.columns, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}