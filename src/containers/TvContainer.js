/* eslint-disable */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TelevisionComponent from '../components/TelevisionComponent.jsx';
import * as TvActions from '../actions/tv.actions';
import { saveFavorite, saveWatchlist, fetchTvFavorites, fetchTvWatchlist } from '../actions/profile.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { tv, app, profile } = state;
    return {
        tv,
        app,
        profile
    };
};

TvActions.saveFavorite = saveFavorite;
TvActions.saveWatchlist = saveWatchlist;
TvActions.fetchTvFavorites = fetchTvFavorites;
TvActions.fetchTvWatchlist = fetchTvWatchlist;

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(TvActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TelevisionComponent);
