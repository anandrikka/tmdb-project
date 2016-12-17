/* eslint-disable */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TelevisionComponent from '../components/TelevisionComponent.jsx';
import * as TvActions from '../actions/tv.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { tvData, appData } = state;
    return {
        tvData,
        appData
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(TvActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TelevisionComponent);
