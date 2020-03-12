import React from 'react';
import {
  Route, Switch, withRouter, RouteComponentProps, Redirect
} from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                "hello, I'm Pipiper"
            </React.Fragment>
        )
    }
}

export default withRouter(App)