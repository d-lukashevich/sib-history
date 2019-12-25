import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './utils/Route';
import { ConnectedRouter } from 'connected-react-router';

import { Main, Projects, Project, News } from '../pages';

import { history } from '../store/initStore';

class MainRouter extends React.Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/" title="Главная" headerPosition={'absolute'} component={Main} />
                    <Route exact path="/projects" title="Проекты" component={Projects} />
                    <Route exact path="/projects/:id" title="Проект" component={Project} />
                    <Route exact path="/news" title="Новости" component={News} />
                    <Redirect to={{ state: { notFoundError: true } }} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default MainRouter;
