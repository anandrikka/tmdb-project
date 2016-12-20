'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_ORIGINAL, MEDIA_TYPE_MOVIE, MEDIA_TYPE_TV } from '../Utilities/AppConstants';
import { movieSortOptions, moviesQuickSearchOptions } from '../Utilities/app-options';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import SearchListComponent from './SearchListComponent.jsx';
import axios from 'axios';


class MoviesSearchListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cardType: 'simple',
            activePage: 1,
            movieCategory: this.props.location.query.type || 'latest'
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.loadMoviesOnType = this.loadMoviesOnType.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
        this.saveFav = this.saveFav.bind(this);
        this.saveWatchlist = this.saveWatchlist.bind(this);
        this.loadPosters = this.loadPosters.bind(this);
        this.searchMovie = this.searchMovie.bind(this);
        this.discoverMovies = this.discoverMovies.bind(this);
    }

    componentDidMount() {
        this.loadMoviesOnType();
        $('select').material_select();
    }

    /**
     * To Load Movies Most Popular, Top Rated, Upcoming & Now Playing with page numbers
     * @param page
     * @param movieCategory
     */
    loadMoviesOnType(page=1, movieCategory) {
        this.props.actions.fetchMovies(movieCategory || this.state.movieCategory, page).then(() => {
            this.loadPosters(this.props.moviesData.search.list);
        })
    }

    loadPosters(list) {
        let posters = [];
        for (let movie in list) {
            posters.push(IMAGE_URI_ORIGINAL + list[movie].poster_path);
        }
        axios.all(posters).then(function() {
            this.setState({
                loading: false
            })
        }.bind(this))
    }

    /**
     * when there is change in query paramter a call is triggered to load the movies of respective categories
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.location.query && nextProps.location.query &&
            this.props.location.query.type !== nextProps.location.query.type) {
            this.setState({
                movieCategory: nextProps.location.query.type
            })
            this.loadMoviesOnType(null, nextProps.location.query.type);
        }
    }

    /**
     * Prepares list with common object pattern for card
     * @param list
     * @returns {Array}
     */
    prepareList(list) {
        const listLength = list.length;
        const modifiedList = [];
        for (let i = 0; i < listLength; i++) {
            const listItem = list[i];
            modifiedList.push({
                id: listItem.id,
                image_path: listItem.backdrop_path,
                genre_ids: listItem.genre_ids,
                title: listItem.original_title,
                overview: listItem.overview,
                date: listItem.release_date,
                vote_average: listItem.vote_average
            });
        }
        return modifiedList;
    }

    /**
     * Triggered when page number is selected
     * @param page
     */
    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadMoviesOnType(page);
    }

    /**
     * Redirects to another page when a movie is selected
     * @param id
     */
    gotoMovie(id) {
        this.props.history.push('movies/' + id);
    }

    /**
     * Styles object used for inline styling
     * @returns {{paginationRight: {float: string}}}
     */
    inlineStyles() {
        return {
            paginationRight: {
                float: 'right'
            }
        }
    }

    /**
     * When save favorite icon clicked
     * @param id
     * @param flag
     */
    saveFav(id, flag) {
        const accountId = this.props.appData.userInfo.id;
        this.props.actions.saveFavorite(accountId, MEDIA_TYPE_MOVIE, id, flag)
    }

    /**
     * When save to watchlist icon clicked
     * @param id
     * @param flag
     */
    saveWatchlist(id, flag) {
        const accountId = this.props.appData.userInfo.id;
        this.props.actions.saveWatchlist(accountId, MEDIA_TYPE_TV, id, flag);
    }

    /**
     * Search Movie with query string
     * @param searchQuery
     */
    searchMovie(searchQuery) {
        if (searchQuery.query.length <= 0) {
            return;
        } 
        this.props.actions.searchMovies(searchQuery);
    }

    /**
     * Filter movies based on various parameters
     * @param discoverQuery
     */
    discoverMovies(discoverQuery) {
        const genres = discoverQuery.with_genres;
        let genresComma = '';
        for (let i = 0; i < genres.length; i++) {
            genresComma = genresComma + genres[i];
            if (i < genres.length-1) {
                genresComma = genresComma + ','
            }
        }
        discoverQuery.with_genres = genresComma;
        this.props.actions.discoverMovies(discoverQuery);
    }

    /**
     * Main mathod to render UI
     * @returns {XML}
     */
    render() {
        const list = this.prepareList(this.props.moviesData.search.list);
        const styles = this.inlineStyles();
        return (
            <div>
                <div className="row">
                    <div className="col offset-s8 s4 offset-m11 m1">
                        <i className="fa fa-th-list fa-2x" style={{color: '#2bbbad'}}></i> &nbsp;
                        <i className="fa fa-th-large fa-2x" style={{color: '#2bbbad'}}></i>   
                    </div>
                </div>
                <div className="row">
                    <FilterComponent type="movies"
                        genres={this.props.appData.movieGenres}
                        sortOptions = {movieSortOptions}
                        quickSearchOptions = {moviesQuickSearchOptions}
                        search = {this.searchMovie}
                        discover = {this.discoverMovies}></FilterComponent>
                    <div className="col s12 m8 l9">
                        <SearchListComponent list={list}
                            genres={this.props.appData.movieGenreMap}
                            gotoItem={this.gotoMovie}
                            saveFav={this.saveFav}
                            saveWatchlist={this.saveWatchlist}
                            type="movies"
                            cardType={this.state.cardType}>
                        </SearchListComponent>
                    </div>
                </div>
                {
                    !this.state.loading ? (
                        <div style={styles.paginationRight}>
                            <PaginationComponent
                                pages={this.props.moviesData.search.totalPages}
                                activePage={this.state.activePage} pageSelect={this.pageSelect}>
                            </PaginationComponent>
                        </div>
                    ) : ''
                }
                <div className="clear"></div>
            </div>
        );
    }
}

MoviesSearchListComponent.propTypes = {

};

export default MoviesSearchListComponent;