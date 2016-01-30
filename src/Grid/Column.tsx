import * as React from 'react'
import Umi from '../Umi/Umi'

interface IColumnProps {
}

export default class Column extends React.Component<IColumnProps, {}> {
    // There should be an actions component that takes in a config object describing the available actions and the
    // methods bound

    render() {
        return (
            <div className="column">
                <Umi/>
            </div>
        );
    }
}