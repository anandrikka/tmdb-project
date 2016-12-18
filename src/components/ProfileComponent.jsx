import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProfileActions from '../actions/profile.actions';

class ProfileComponent extends Component {

    componentDidMount() {
        const accountId = this.props.appData.userInfo.accountId;
        this.props.actions.fetchMovieFavorites(accountId);
        this.props.actions.fetchTvFavorites(accountId);
        this.props.actions.fetchMovieWatchlist(accountId);
        this.props.actions.fetchTvWatchlist(accountId);
        this.props.actions.fetchRatedMovies(accountId);
        this.props.actions.fetchRatedTv(accountId);
    }

    render() {
        return (
            <div>
                <div className="section">
                    <h5>Profile</h5>
                    <p>Profile Details</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Movies Watchlist</h5>
                    <p>Movies Watchlist</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Tv Watchlist</h5>
                    <p>Stuff</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Favorite Movies</h5>
                    <p>Stuff</p>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <h5>Favorite Television</h5>
                    <p>Stuff</p>
                </div>
            </div>
        );
    }
}

ProfileComponent.propTypes = {

};

const mapStateToProps = (state) => {
    const { profileData, appData } = state;
    return {
        appData,
        profileData
    }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ProfileActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);