'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import {Provider} from 'react-redux';
import store from './stores/store';

import MoviesContainer from './containers/MoviesContainer';
import TvContainer from './containers/TvContainer';
import TvListComponent from './components/TvListComponent';
import PeopleComponent from './components/PeopleComponent';
import HomeContainer from './containers/HomeContainer';
import MoviesComponent from './components/MoviesComponent'
import MovieComponent from './components/MovieComponent';
import MoviesListComponent from './components/MoviesListComponent';

import css from './styles/main.scss';

import AppContainer from './containers/AppContainer';

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={AppContainer}>
                <IndexRoute component={HomeContainer} />
                <Route path="/home" component={HomeContainer}></Route>
                <Route path="/movies" component={MoviesContainer}>
                    <IndexRoute component={MoviesListComponent}></IndexRoute>
                    <Route path="/movies/:id" component={MovieComponent}></Route>
                </Route>
                <Route path="/tv" component={TvContainer}>
                    <IndexRoute component={TvListComponent}></IndexRoute>
                </Route>
                <Route path="/people" component={PeopleComponent}/>
            </Route>
        </Router>
    </Provider>
    
);

ReactDOM.render(router, document.getElementById('app'));
