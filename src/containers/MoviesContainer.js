/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MoviesComponent from '../components/MoviesComponent.jsx';
import * as MovieActions from '../actions/movies.actions';
import { saveFavorite } from '../actions/profile.actions';
/* eslint-enable */

const mapStateToProps = (state) => {
    const { moviesData, appData } = state;
    return {
        moviesData,
        appData
    };
};

MovieActions.saveFavorite = saveFavorite;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(MovieActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);
