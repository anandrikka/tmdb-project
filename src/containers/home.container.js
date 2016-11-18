'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomeComponent from '../components/home.component';

import * as HomeActions from '../actions/home.actions';

let mapStateToProps = (state) => {
    let { home } = state;
    return {
        home
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(HomeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);