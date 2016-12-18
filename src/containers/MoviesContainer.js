/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MoviesComponent from '../components/MoviesComponent.jsx';
import * as MovieActions from '../actions/movies.actions';
import { saveFavorite, saveWatchlist } from '../actions/profile.actions';
/* eslint-enable */

const mapStateToProps = (state) => {
    const { moviesData, appData, profileData } = state;
    return {
        moviesData,
        appData,
        profileData
    };
};

MovieActions.saveFavorite = saveFavorite;
MovieActions.saveWatchlist = saveWatchlist;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(MovieActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);
