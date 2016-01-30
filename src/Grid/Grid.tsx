import * as React from 'react'
import * as _ from 'lodash'

import Row from './Row'

interface IGridProps {
}

export default class Grid extends React.Component<IGridProps, {}> {
    rows = [<Row/>];

    addRow() {
        this.rows.push(<Row/>);

        console.log(this.rows);
    }

    render() {
        return (
            <div className="row">
                <strong onClick={() => {this.addRow()}}>add row</strong>
                {_.forEach(this.rows, (component:any, key:number) =>
                    {component}
                    )}
            </div>
        );
    }
}