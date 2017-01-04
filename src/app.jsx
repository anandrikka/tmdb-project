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
import MovieDetailsComponent from './components/MovieDetailsComponent.jsx';
import MoviesSearchListComponent from './components/MoviesSearchListComponent.jsx';
import TvSearchListComponent from './components/TvSearchListComponent.jsx';
import TvDetailsComponent from './components/TvDetailsComponent.jsx';
import PeopleListComponent from './components/PeopleListComponent.jsx';
import PeopleDetailsComponent from './components/PeopleDetailsComponent.jsx';
import AppContainer from './containers/AppContainer';
import ProfileComponent from './components/ProfileComponent.jsx';
import PageNotFound from './components/PageNotFound.jsx';
import Routes from './routes';

import css from './styles/main.scss'; // eslint-ignore-line

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            {Routes}
        </Router>
    </Provider>
    
);

ReactDOM.render(router, document.getElementById('app'));
