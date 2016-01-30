import * as React from 'react'
import Umi from '../Umi/Umi'
import Grid from './Grid'

enum Split {Vertically, Horizontally}

interface IColumnProps {
}

interface IColumnState {
    Split:Split;
}

export default class Column extends React.Component<IColumnProps, IColumnState> {
    // There should be an actions component that takes in a config object describing the available actions and the
    // methods bound

    componentWillMount() {
        this.setState({Split: null});
    }

    split(which:Split) {
        this.setState({Split: which});
    }

    render() {
        const isSplit:Split = this.state['Split'];

        let Child:any;

        switch (isSplit) {
            case Split.Horizontally:
                Child = <Grid rows={2} columns={1}/>;
                break;
            case Split.Vertically:
                Child = <Grid rows={1} columns={2}/>;
                break;
            default:
                Child = <Umi/>;
                break;
        }

        return (
            <div className="column">
                <div className="controls">
                    <strong onClick={() => {this.split(Split.Horizontally)}}>split horizontally</strong>
                    <small>|</small>
                    <strong onClick={() => {this.split(Split.Vertically)}}>split vertically</strong>
                </div>

                {Child}
            </div>
        );
    }
}