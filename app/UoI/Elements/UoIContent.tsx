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

    componentDidMount() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.refs['mathjax']]);
    }

    componentDidUpdate() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.refs['mathjax']]);
    }

    createContent(content:string) {
        return {__html: content};
    };

    render() {
        return this.layout ? (
            <article ref="ps-container">
                <header>
                    <small className="label">{this.layout.type}</small>
                    <strong className="heading">{this.layout.title}</strong>
                </header>

                <main ref="mathjax" dangerouslySetInnerHTML={this.createContent(this.layout.htmlContent)}/>
            </article>
        ) : (<div></div>);
    }
}

function select(state) {
    return {
        UoI: state.UoIReducer.get('UoI')
    };
}

export default connect(select)(UoIContent);