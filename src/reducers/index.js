import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import app from './app.reducer';
import home from './home.reducer';
import movies from './movies.reducer';
import tv from './tv.reducer';
import people from './people.reducer';
import profile from './profile.reducer';


export default combineReducers({
    app,
    home,
    movies,
    tv,
    profile,
    people,
    router: routerStateReducer
});
