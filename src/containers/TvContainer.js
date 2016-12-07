import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TvComponent from '../components/TvComponent.jsx';
import * as TvActions from '../actions/tv.actions';

const mapStateToProps = (state) => {
    const { tvData, appData } = state;
    return {
        appData,
        tvData
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(TvActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TvComponent);
