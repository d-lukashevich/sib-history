import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './utils/Route';
import { ConnectedRouter } from 'connected-react-router';

import { Main, Projects, Project } from '../pages';

import { history } from '../store/initStore';

class MainRouter extends React.Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" title="Главная" component={Main} />
                    <Route exact path="/projects" title="Проекты" component={Projects} />
                    <Route exact path="/project/:id" title="Проект" component={Project} />
                    <Redirect to={{ state: { notFoundError: true } }} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default MainRouter;
