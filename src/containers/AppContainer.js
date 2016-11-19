'use strict';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AppComponent from '../components/AppComponent';
import * as AppActions from '../actions/app.actions';

let mapStateToProps = (state) => {
    let {appData} = state;
    return {
        appData
    }
};

let mapDispatchToProps = (dispatch) => (bindActionCreators(AppActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);