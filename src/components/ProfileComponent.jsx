import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import PaginationComponent from './PaginationComponent.jsx';
import * as ProfileActions from '../actions/profile.actions';
import { W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate } from '../utilities/AppUtils';
import ProfileItem from './ProfileItem.jsx';

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favMoviesPage: 1,
            favTvPage: 1,
            moviesWatchPage: 1,
            tvWatchPage: 1,
            ratedMoviesPage: 1,
            ratedTvPage: 1
        }
        this.favMoviePageSelect = this.favMoviePageSelect.bind(this);
        this.favTvPageSelect = this.favTvPageSelect.bind(this);
        this.movieWatchlistPageSelect = this.movieWatchlistPageSelect.bind(this);
        this.tvWatchlistPageSelect = this.tvWatchlistPageSelect.bind(this);
        this.ratedMoviesPageSelect = this.ratedMoviesPageSelect.bind(this);
        this.ratedTvPageSelect = this.ratedTvPageSelect.bind(this);
    }

    componentDidMount() {
        $('ul.profile-tabs').tabs();
        const accountId = this.props.app.userInfo.id;
        if (accountId) {
            this.props.actions.fetchMovieFavorites(accountId);
            this.props.actions.fetchTvFavorites(accountId);
            this.props.actions.fetchMovieWatchlist(accountId);
            this.props.actions.fetchTvWatchlist(accountId);
            this.props.actions.fetchRatedMovies(accountId);
            this.props.actions.fetchRatedTv(accountId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.app.userInfo.id !== nextProps.app.userInfo.id) {
            const accountId = nextProps.app.userInfo.id;
            this.props.actions.fetchMovieFavorites(accountId);
            this.props.actions.fetchTvFavorites(accountId);
            this.props.actions.fetchMovieWatchlist(accountId);
            this.props.actions.fetchTvWatchlist(accountId);
            this.props.actions.fetchRatedMovies(accountId);
            this.props.actions.fetchRatedTv(accountId);
        }
    }

    render() {
        const favMovies = this.props.profile.favoriteMovies.list;
        const favTv = this.props.profile.favoriteTv.list;
        const moviesWatchlist = this.props.profile.movieWatchlist.list;
        const tvWatchlist = this.props.profile.tvWatchlist.list;
        const ratedMovies = this.props.profile.ratedMovies.list;
        const ratedTv = this.props.profile.ratedTv.list;
        return (
            <div className="row">
                <div className="col s12" style={{marginBottom: '10px'}}>
                    <ul className="tabs tabs-fixed-width profile-tabs">
                        <li className="tab col s4">
                            <a className="active"  href="#fav">Favorites</a>
                        </li>
                        <li className="tab col s4">
                            <a href="#watchlist">Watchlist</a>
                        </li>
                        <li className="tab col s4">
                        <a href="#rated">Rated</a>
                        </li>
                    </ul>
                </div>
                <div className="col s12" id="fav">
                    <div className="row">
                        <h5>Favorite Movies</h5>    
                        {
                            favMovies.map((favMovie, index) => {
                                return <ProfileItem item={favMovie} key={index}
                                    genres={this.props.app.movieGenreMap} />
                            })
                        }
                        <div className="clearfix"></div>
                        {
                            this.props.profile.favoriteMovies.totalPages > 1 &&
                            (<div className="right">
                                <PaginationComponent
                                    pages={this.props.profile.favoriteMovies.totalPages}
                                    activePage={this.state.favMoviesPage}
                                    pageSelect={this.favMoviePageSelect}>
                                </PaginationComponent>
                            </div>)
                        }
                        <div className="clearfix"></div>
                        <h5>Favorite Tv</h5>
                        {
                            favTv.map((favT, index) => {
                                return <ProfileItem item={favT} key={index}
                                    genres={this.props.app.tvGenreMap} />
                            })
                        }
                        <div className="clearfix"></div>
                        {
                            this.props.profile.favoriteTv.totalPages > 1 && (
                            <div className="right">
                                <PaginationComponent
                                    pages={this.props.profile.favoriteTv.totalPages}
                                    activePage={this.state.favTvPage}
                                    pageSelect={this.favTvPageSelect}>
                                </PaginationComponent>
                            </div> )
                        }
                    </div>
                </div>
                <div className="col s12" id="watchlist">
                    <div className="row">
                        <h5>Movie Watchlist</h5>    
                        {
                            moviesWatchlist.map((movie, index) => {
                                return <ProfileItem item={movie} key={index}
                                    genres={this.props.app.movieGenreMap} />
                            })
                        }
                        <div className="clearfix"></div>
                        {
                            this.props.profile.movieWatchlist.totalPages > 1 &&
                            (<div className="right">
                                <PaginationComponent
                                    pages={this.props.profile.movieWatchlist.totalPages}
                                    activePage={this.state.moviesWatchPage}
                                    pageSelect={this.movieWatchlistPageSelect}>
                                </PaginationComponent>
                            </div>)
                        }
                        <div className="clearfix"></div>
                        <h5>Television Watchlist</h5>
                        {
                            tvWatchlist.map((tv, index) => {
                                return <ProfileItem item={tv} key={index}
                                    genres={this.props.app.tvGenreMap} />
                            })
                        }
                        <div className="clearfix"></div>
                        {
                            this.props.profile.tvWatchlist.totalPages > 1 && (
                            <div className="right">
                                <PaginationComponent
                                    pages={this.props.profile.tvWatchlist.totalPages}
                                    activePage={this.state.tvWatchPage}
                                    pageSelect={this.tvWatchlistPageSelect}>
                                </PaginationComponent>
                            </div> )
                        }
                    </div>
                </div>
                <div className="col s12" id="rated">
                    <h5>Rated Movies</h5>    
                    {
                        ratedMovies.map((movie, index) => {
                            return <ProfileItem item={movie} key={index}
                                genres={this.props.app.movieGenreMap} />
                        })
                    }
                    <div className="clearfix"></div>
                    {
                        this.props.profile.ratedMovies.totalPages > 1 > 0 &&
                        (<div className="right">
                            <PaginationComponent
                                pages={this.props.profile.ratedMovies.totalPages}
                                activePage={this.state.ratedMoviesPage}
                                pageSelect={this.ratedMoviesPageSelect}>
                            </PaginationComponent>
                        </div>)
                    }
                    <div className="clearfix"></div>
                    <h5>Rated Television</h5>
                    {
                        ratedTv.map((tv, index) => {
                            return <ProfileItem item={tv} key={index}
                                genres={this.props.app.tvGenreMap} />
                        })
                    }
                    <div className="clearfix"></div>
                    {
                        this.props.profile.ratedTv.totalPages > 1 && (
                        <div className="right">
                            <PaginationComponent
                                pages={this.props.profile.ratedTv.totalPages}
                                activePage={this.state.ratedTvPage}
                                pageSelect={this.ratedTvPageSelect}>
                            </PaginationComponent>
                        </div> )
                    }
                </div>
            </div>
        );
    }

    favMoviePageSelect(page) {
        const state = this.state;
        state.favMoviesPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchMovieFavorites(accountId, page);
    }

    favTvPageSelect(page) {
        const state = this.state;
        state.favTvPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchTvFavorites(accountId, page);
    }

    movieWatchlistPageSelect(page) {
        const state = this.state;
        state.moviesWatchPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchMovieWatchlist(accountId, page);
    }

    tvWatchlistPageSelect(page) {
        const state = this.state;
        state.tvWatchPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchTvWatchlist(accountId, page);
    }

    ratedMoviesPageSelect(page) {
        const state = this.state;
        state.ratedMoviesPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchRatedMovies(accountId, page);
    }

    ratedTvPageSelect(page) {
        const state = this.state;
        state.ratedTvPage = page;
        this.setState(state);
        const accountId = this.props.app.userInfo.id;
        this.props.actions.fetchRatedTv(accountId, page);
    }
}

ProfileComponent.propTypes = {

};

const mapStateToProps = (state) => {
    const { profile, app } = state;
    return {
        app,
        profile
    }
}

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(ProfileActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);