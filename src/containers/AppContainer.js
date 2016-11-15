'use strict';

import React, {PropTypes} from 'redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import App from '../components/AppComponent';
import * as Actions from '../actions/AppActions';

let mapStateToProps = (state) => ({
    movies: state.movies
});

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);