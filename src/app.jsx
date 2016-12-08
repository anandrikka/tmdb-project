import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './stores/store';

import HomeContainer from './containers/HomeContainer';
import MoviesContainer from './containers/MoviesContainer';
import TvContainer from './containers/TvContainer';
import PeopleContainer from './containers/PeopleContainer';
import MoviesComponent from './components/MoviesComponent.jsx'
import MovieComponent from './components/MovieComponent.jsx';
import MoviesListComponent from './components/MoviesListComponent.jsx';
import TvListComponent from './components/TvListComponent.jsx';
import PeopleListComponent from './components/PeopleListComponent.jsx';
import AppContainer from './containers/AppContainer';

import css from './styles/main.scss'; // eslint-ignore-line

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
                <Route path="/people" component={PeopleContainer}>
                    <IndexRoute component={PeopleListComponent}></IndexRoute>
                </Route>                
            </Route>
        </Router>
    </Provider>
    
);

ReactDOM.render(router, document.getElementById('app'));
