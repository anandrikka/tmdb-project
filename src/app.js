'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppComponent from './components/AppComponent';
import MoviesComponent from './components/MoviesComponent';
import TvComponent from './components/TvComponent';
import PeopleComponent from './components/PeopleComponent';
import HomeComponent from './components/HomeComponent';

import css from './styles/main.scss';

const router = (
    <Router history={browserHistory}>
        <Route path='/' component={AppComponent}>
            <IndexRoute component={HomeComponent}/>
            <Route path="/movies" component={MoviesComponent}/>
            <Route path="/tv" component={TvComponent} />
            <Route path="/people" component={PeopleComponent}/>
        </Route>
    </Router>
);

ReactDOM.render(router, document.getElementById('app'));
