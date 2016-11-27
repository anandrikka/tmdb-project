'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MoviesComponent from '../components/MoviesComponent';
import * as MovieActions from '../actions/movies.actions';

const mapStateToProps = (state) => {
    let {moviesData, appData} = state;
    return {
        appData,
        moviesData
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(MovieActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);