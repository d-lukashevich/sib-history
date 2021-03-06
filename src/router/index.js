import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import Route from './utils/Route';
import { ConnectedRouter } from 'connected-react-router';

import { Main, Projects, Project, News, NewsEntry, About, Videos, Docs } from '../pages';

import { history } from '../store/initStore';

const MainRouter = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" title="Главная" headerPosition={'absolute'} component={Main} />
            <Route exact path="/projects" title="Проекты" component={Projects} />
            <Route exact path="/projects/:id" title="Проект" component={Project} />
            <Route exact path="/news" title="Новости" component={News} />
            <Route exact path="/news/:id" title="Новости" component={NewsEntry} />
            <Route exact path="/about" title="О нас" component={About} />
            <Route exact path="/videos" title="Видео" component={Videos} />
            <Route exact path="/docs" title="Документы" component={Docs} />
            <Redirect to={{ state: { notFoundError: true } }} />
        </Switch>
    </ConnectedRouter>
);

export default MainRouter;
