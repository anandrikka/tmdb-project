'use strict';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import AppComponent from '../components/AppComponent';
import * as appActions from '../actions/app.actions';

let mapStateToProps = (state) => {
    let {appContainer} = state;
    return {
        appContainer
    }
};

let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(appActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);