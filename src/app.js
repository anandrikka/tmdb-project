'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import store from './stores/store';

import MoviesComponent from './components/movies.component';
import TvComponent from './components/tv.component';
import PeopleComponent from './components/people.component';
import HomeComponent from './components/home.component';

import css from './styles/main.scss';

import AppContainer from './containers/app.container';

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={HomeComponent}/>
                <Route path="/movies" component={MoviesComponent}/>
                <Route path="/tv" component={TvComponent} />
                <Route path="/people" component={PeopleComponent}/>
            </Route>
        </Router>
    </Provider>
    
);

ReactDOM.render(router, document.getElementById('app'));
