import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PaginationComponent from './PaginationComponent.jsx';
import * as ProfileActions from '../actions/profile.actions';
import { W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate } from '../utilities/AppUtils';

class ProfileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favMoviesPage: 1,
            favTvPage: 1
        }
        this.favMoviePageSelect = this.favMoviePageSelect.bind(this);
        this.favTvPageSelect = this.favTvPageSelect.bind(this);
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

    imageTag(item) {
        const poster_path = item.poster_path;
        let imageTag;
        if(poster_path && poster_path !== null) {
            const src = W154ImageUrl + poster_path;
            imageTag = <img src={src} className="responsive-img"/>
        }else {
            let name = '';
            const title = item.title || item.name;
            let nameSplit = title.split(' ');
            if(nameSplit.length > 0) {
                nameSplit.forEach(function(n){
                    name = name + n.substr(0, 1);
                })
            }else {
                name = title.substr(0, 2);
            }
            imageTag = (<div className="responsive-img valign-wrapper"><h5 className="valign">{name}</h5></div>);
        }
        return imageTag;
    }

    genres(list, map) {
        let genres = '';
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (map[list[i]] && map[list[i]].name) {
                    genres += map[list[i]].name
                }
                if (i < list.length - 1) {
                    genres += ', '
                }
            }
        }
        return genres;
    }

    render() {
        const favMovies = this.props.profile.favoriteMovies.list;
        const favTv = this.props.profile.favoriteTv.list;
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
                                const imageTag = this.imageTag(favMovie);
                                const genres = this.genres(favMovie.genre_ids, this.props.app.movieGenreMap)
                                return (
                                    <div className="col s12 m6 l3" key={index}>
                                        <div className="card horizontal profile-card">
                                            <div className="card-image">
                                                {imageTag}
                                            </div>
                                            <div className="card-stacked">
                                                <div className="card-content">
                                                    <p className="title ellip">
                                                        {favMovie.title} ({formatDate(favMovie.release_date, 'YYYY')})
                                                    </p>
                                                    <p className="ellip">{genres}</p>
                                                    <p><b>Rating: </b>{favMovie.vote_average}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                )
                            })
                        }
                        {
                            favMovies.length > 0 &&
                            (<div className="right">
                                <PaginationComponent
                                    pages={this.props.profile.favoriteMovies.totalPages}
                                    activePage={this.state.favMoviesPage}
                                    pageSelect={this.favMoviePageSelect}>
                                </PaginationComponent>
                            </div>)
                        }
                        <h5>Favorite Tv</h5>
                        {
                            favTv.map((favT, index) => {
                                const imageTag = this.imageTag(favT);
                                const genres = this.genres(favT.genre_ids, this.props.app.tvGenreMap)
                                return (
                                    <div className="col s12 m6 l3" key={index}>
                                        <div className="card horizontal profile-card">
                                            <div className="card-image">
                                                {imageTag}
                                            </div>
                                            <div className="card-stacked">
                                                <div className="card-content">
                                                    <p className="title ellip">
                                                        {favT.name} ({formatDate(favT.first_air_date, 'YYYY')})
                                                    </p>
                                                    <p className="ellip">{genres}</p>
                                                    <p><b>Rating: </b>{favT.vote_average}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                )
                            })
                        }
                        {
                            favTv.length > 0 && (
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
                    Watchlist
                </div>
                <div className="col s12" id="rated">
                    Rated
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