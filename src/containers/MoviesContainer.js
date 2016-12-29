/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MoviesComponent from '../components/MoviesComponent.jsx';
import * as MovieActions from '../actions/movies.actions';
import { saveFavorite, saveWatchlist } from '../actions/profile.actions';
/* eslint-enable */

const mapStateToProps = (state) => {
    const { movies, app, profile } = state;
    return {
        movies,
        app,
        profile
    };
};

// Adding these two from profile actions because they need to be performed from here
MovieActions.saveFavorite = saveFavorite;
MovieActions.saveWatchlist = saveWatchlist;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MovieActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);
