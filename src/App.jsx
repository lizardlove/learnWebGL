import React from 'react';
import {
  Route, Switch, withRouter, RouteComponentProps, Redirect
} from 'react-router-dom';

import {programs} from './routes'
import Template from './pages/template'
import Home from './pages/home'
import TopBar from './pages/topBar'
import Search from './pages/search'


class App extends React.Component {
    renderTop() {
        if (!/^\/workshop/.test(this.props.location.pathname)) {
            return <TopBar />;
        }
      
        return null;
    }
    renderFooter() {
        if (!/^\/workshop/.test(this.props.location.pathname)) {
            return <div className={cx('footer')}></div>;
        }
      
        return null;
    }
    renderRoutes() {
        return (
            <Switch>
                {
                    programs.map(program => (
                        <Route key={program.path}
                               path={`/workshop/${program.path}`}
                               render={() => <Template {...program} />}
                        />
                    ))
                }
                <Route path={'/search'} component={Search} />
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