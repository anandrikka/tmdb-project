'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomeComponent from '../components/HomeComponent';

import * as HomeActions from '../actions/home.actions';

let mapStateToProps = (state) => {
    let { homeData } = state;
    return {
        homeData
    };
}

let mapDispatchToProps = (dispatch) => (bindActionCreators(HomeActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);