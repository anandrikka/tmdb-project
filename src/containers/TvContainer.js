/* eslint-disable */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TVsComponent from '../components/TVsComponent.jsx';
import * as TvActions from '../actions/tv.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { tvData, appData } = state;
    return {
        appData,
        tvData
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(TvActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TVsComponent);
