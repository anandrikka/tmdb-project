/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MoviesComponent from '../components/MoviesComponent.jsx';
import * as MovieActions from '../actions/movies.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { moviesData, appData, isLoading } = state;
    return {
        appData,
        moviesData,
        isLoading
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(MovieActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);
