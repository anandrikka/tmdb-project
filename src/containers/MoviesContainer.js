'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react'

import MoviesComponent from '../components/MoviesComponent';
import * as MovieActions from '../actions/movies.actions';

const mapStateToProps = (state) => {
    let {moviesData, appData} = state;
    return {
        appData,
        moviesData
    }
}

class MainMovies extends Component {
    render() {
        const child = React.cloneElement(this.props.children, this.props);
        return (
            <div>
                {child}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(MovieActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);