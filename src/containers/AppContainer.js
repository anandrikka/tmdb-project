/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AppComponent from '../components/AppComponent.jsx';
import * as AppActions from '../actions/app.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { app } = state;
    return {
        app
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(AppActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);
