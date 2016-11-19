'use strict';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import App from '../components/app.component';
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

export default connect(mapStateToProps, mapDispatchToProps)(App);