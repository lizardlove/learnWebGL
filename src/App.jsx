import React from 'react';
import {
  Route, Switch, withRouter, RouteComponentProps, Redirect
} from 'react-router-dom';

import {programs} from './routes'
import Template from './pages/template'
import Home from './pages/home'
import TopBar from './pages/topBar'

class App extends React.Component {
    renderTop() {
        return <TopBar />
    }
    renderRoutes() {
        return (
            <Switch>
                {
                    programs.map(program => (
                        <Route key={program.path}
                               path={`/program/${program.path}`}
                               render={() => <Template {...program} />}
                        />
                    ))
                }
                <Route path={'/'} component={Home} />
                <Route render={() => <Redirect to={'/'} />} />
            </Switch>
        )
    }
    render() {
        return (
            <React.Fragment>
                {this.renderTop()}
                {this.renderRoutes()}
            </React.Fragment>
        )
    }
}

export default withRouter(App)