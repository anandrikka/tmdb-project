import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* eslint-disable */

import HomeContainer from './containers/HomeContainer';
import MoviesContainer from './containers/MoviesContainer';
import TvContainer from './containers/TvContainer';
import PeopleContainer from './containers/PeopleContainer';
import MoviesComponent from './components/MoviesComponent.jsx'
import MovieDetailsComponent from './components/MovieDetailsComponent.jsx';
import MoviesSearchListComponent from './components/MoviesSearchListComponent.jsx';
import TvSearchListComponent from './components/TvSearchListComponent.jsx';
import TvDetailsComponent from './components/TvDetailsComponent.jsx';
import PeopleListComponent from './components/PeopleListComponent.jsx';
import PeopleDetailsComponent from './components/PeopleDetailsComponent.jsx';
import AppContainer from './containers/AppContainer';
import ProfileComponent from './components/ProfileComponent.jsx';
import PageNotFound from './components/PageNotFound.jsx';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/profile" component={ProfileComponent}></Route>
        <Route path="/home" component={HomeContainer}></Route>
        <Route path="/movies" component={MoviesContainer}>
            <IndexRoute component={MoviesSearchListComponent}></IndexRoute>
            <Route path=":id" component={MovieDetailsComponent}></Route>
        </Route>
        <Route path="/tv" component={TvContainer}>
            <IndexRoute component={TvSearchListComponent}></IndexRoute>
            <Route path=":id" component={TvDetailsComponent}></Route>
        </Route>
        <Route path="/people" component={PeopleContainer}>
            <IndexRoute component={PeopleListComponent}></IndexRoute>
            <Route path=":id" component={PeopleDetailsComponent}></Route>
        </Route>
        <Route path="*" component={PageNotFound}></Route>
    </Route>
);

/* eslint-enable */
