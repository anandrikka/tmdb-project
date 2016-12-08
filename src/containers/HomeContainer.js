/* eslint-disable */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomeComponent from '../components/HomeComponent.jsx';
import * as HomeActions from '../actions/home.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { homeData } = state;
    return {
        homeData
    };
};

const mapDispatchToProps = dispatch => (bindActionCreators(HomeActions, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
