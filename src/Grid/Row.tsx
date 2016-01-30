import * as React from 'react'
import * as _ from 'lodash'
import Column from './Column'

interface IRowProps {
}

export default class Row extends React.Component<IRowProps, {}> {
    // There should be an actions component that takes in a config object describing the available actions and the
    // methods bound

    // A property which holds the information about rows

    // Add row above
    // Add row below

    // Add column left?
    // Add column right?

    columns = [<Column/>];

    addColumn() {
        this.columns.push(<Column/>);

        console.log(this.columns);
    }

    render() {
        return (
            <div className="row">
                <strong onClick={() => {this.addColumn()}}>add column</strong>
                {_.forEach(this.columns, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}