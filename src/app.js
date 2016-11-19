'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import store from './stores/store';

import MoviesComponent from './components/MoviesComponent';
import TvComponent from './components/TvComponent';
import PeopleComponent from './components/PeopleComponent';
import HomeContainer from './containers/HomeContainer';

import css from './styles/main.scss';

import AppContainer from './containers/AppContainer';

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={HomeContainer}/>
                <Route path="/movies" component={MoviesComponent}/>
                <Route path="/tv" component={TvComponent} />
                <Route path="/people" component={PeopleComponent}/>
            </Route>
        </Router>
    </Provider>
    
);

ReactDOM.render(router, document.getElementById('app'));
