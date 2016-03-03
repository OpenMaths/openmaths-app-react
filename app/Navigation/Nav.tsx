import * as React from 'react'
import * as _ from 'lodash'
import { connect } from 'react-redux'
//import { RouterState } from 'redux-tiny-router'
//import { getGSI } from '../Utils/Url'

//import { signUserOut } from '../Authorisation/Actions'
//import { IGoogleApi, GoogleUser } from '../Authorisation/DataStructure'

//import LoadingIndicator from './LoadingIndicator'

//declare var gapi:IGoogleApi;

interface INavProps {
    // STATE => PROPS
    dispatch?: Redux.Dispatch;
    //GlobalSectionIdentifier?:string[];
    //UserSignedIn?:boolean;
    //UserData?:GoogleUser;
}

class Nav extends React.Component<INavProps, {}> {
    //userSignOut() {
    //    let auth2 = gapi.auth2.getAuthInstance();
    //
    //    auth2.signOut().then(() => {
    //        this.props.dispatch(signUserOut());
    //    });
    //}

    render() {
        return (
            <nav id="primary" className="hidden">
                <ul>
                    <li>
                        <a>
                            <i className="fa fa-location-arrow"></i>
                            Explore
                        </a>
                    </li>
                    <li>
                        <a>
                            <i className="fa fa-terminal"></i>
                            Editor
                        </a>
                    </li>
                </ul>

                <a className="logo">
                    <strong>openmaths</strong>
                </a>

                <ul className="actions">
                    <li>
                        <a>
                            <i className="fa fa-font"></i>
                            <span className="icon-label">Traditional Definitions</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i className="fa fa-moon-o"></i>
                            <span className="icon-label">Dark Theme</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i className="fa fa-sign-in"></i>
                            <span className="icon-label">Sign In with Google</span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <i className="fa fa-sign-out"></i>
                            <span className="icon-label">Sign Out</span>
                        </a>
                    </li>
                    <li className="user">
                        <span>NAME</span>
                    </li>
                </ul>

                <div className="ui-show-nav">
                    <div className="ui-jalousie">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </nav>);
    }
}

function select(state) {
    return {
        //GlobalSectionIdentifier: state.router.paths,
        //UserSignedIn: state.AuthorisationReducer.signedIn,
        //UserData: state.AuthorisationReducer.data
    };
}

export default connect(select)(Nav);