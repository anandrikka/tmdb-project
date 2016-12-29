'use strict';

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import * as AppConstants from '../utilities/AppConstants';
import { movieSortOptions, moviesQuickSearchOptions } from '../utilities/AppData';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import SearchListComponent from './SearchListComponent.jsx';

class MoviesSearchListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1,
            searchType: 'quickSearch',
            quickSearchType: 'nowPlaying'
        }
        //Bind functions to this that need props
        this.pageSelect = this.pageSelect.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
        this.saveFav = this.saveFav.bind(this);
        this.saveWatchlist = this.saveWatchlist.bind(this);
        this.loadPosters = this.loadPosters.bind(this);
        this.loadMoviesByType = this.loadMoviesByType.bind(this);
    }

    /**
     * DOM Loaded
     */
    componentDidMount() {
        this.loadMoviesByType().loadMoviesByQuickSearch();
    }

    /**
     * Load Movies based on filter
     */
    loadMoviesByType() {
        const loadActions = {
            loadMoviesByQuickSearch: (filterState) => {
                let movies;
                const state = this.state;
                if(filterState) {
                    state.activePage = 1;
                    state.quickSearchType = filterState.quickSearch;
                    state.language = filterState.language;
                    state.region = filterState.region;
                }
                state.searchType = 'quickSearch';
                this.setState(state);
                switch (this.state.quickSearchType) {
                    case 'topRated':
                        movies = this.props.actions.fetchTopRated;
                        break;
                    case 'upcoming':
                        movies = this.props.actions.fetchUpcoming;
                        break;
                    case 'popular':
                        movies = this.props.actions.fetchPopular;
                        break;
                    default:
                        movies = this.props.actions.fetchNowPlaying;
                }
                var quickSearchQuery = {
                    language: this.state.language,
                    region: this.state.region,
                    page: this.state.activePage
                };
                movies(quickSearchQuery).then(() => {
                    this.loadPosters(this.props.movies.search.list);
                });
            },
            searchMovies: (filterState) => {
                const state = this.state;
                if(filterState) {
                    state.activePage = 1;
                    const filterStateQuery = JSON.parse(JSON.stringify(filterState));
                    state.searchQuery = filterStateQuery.search
                    state.searchType = 'search';
                    state.language = filterStateQuery.language;
                    state.region = filterStateQuery.region;
                    state.searchQuery.language = filterStateQuery.language;
                    state.searchQuery.region = filterStateQuery.region;
                }
                state.searchQuery.page = this.state.activePage;
                this.setState(state);
                if (this.state.searchQuery.query.length <= 0) {
                    return;
                }
                this.props.actions.searchMovies(this.state.searchQuery).then(() => {
                    this.loadPosters(this.props.movies.search.list);
                });
            },
            discoverMovies: (filterState) => {
                const state = this.state;
                if(filterState) {
                    state.activePage = 1;
                    const filterDiscoverQuery = JSON.parse(JSON.stringify(filterState));
                    state.discoverQuery = filterDiscoverQuery.discover;
                    state.language = filterDiscoverQuery.language;
                    state.region = filterDiscoverQuery.region;
                    state.discoverQuery.language = filterDiscoverQuery.language;
                    state.discoverQuery.region = filterDiscoverQuery.region;
                    const genres = filterDiscoverQuery.discover.with_genres;
                    let genresComma = '';
                    for (let i = 0; i < genres.length; i++) {
                        genresComma = genresComma + genres[i];
                        if (i < genres.length-1) {
                            genresComma = genresComma + ','
                        }
                    }
                    state.discoverQuery.with_genres = genresComma;
                    state.searchType = 'discover';
                }
                state.discoverQuery.page = this.state.activePage;
                this.setState(state);
                this.props.actions.discoverMovies(this.state.discoverQuery).then(() => {
                    this.loadPosters(this.props.movies.search.list);
                });
            }
        }
        return loadActions;
    }

    /**
     * Load Posters
     * @param list
     */
    loadPosters(list) {
        let posters = [];
        for (let movie in list) {
            posters.push(AppConstants.OriginalImageUrl + list[movie].poster_path);
        }
        axios.all(posters).then(function() {
            this.setState({
                loading: false
            })
        }.bind(this));
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
        const state = this.state;
        state.loading = true;
        state.activePage = page;
        this.setState(state);
        if(this.state.searchType === 'search') {
            this.loadMoviesByType().searchMovies();
        }else if(this.state.searchType === 'discover') {
            this.loadMoviesByType().discoverMovies();
        }else {
            this.loadMoviesByType().loadMoviesByQuickSearch();
        }
    }

    /**
     * Redirects to another page when a movie is selected
     * @param id
     */
    gotoMovie(id) {
        this.context.router.push('movies/' + id);
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
        const accountId = this.props.app.userInfo.id;
        this.props.actions.saveFavorite(accountId,AppConstants.MEDIA_TYPE_MOVIE, id, flag)
    }

    /**
     * When save to watchlist icon clicked
     * @param id
     * @param flag
     */
    saveWatchlist(id, flag) {
        const accountId = this.props.app.userInfo.id;
        this.props.actions.saveWatchlist(accountId, AppConstants.MEDIA_TYPE_MOVIE, id, flag);
    }

    uiElements() {
        const uiElements = {
            quickSearchOptions: (options) => {
                const quickSearchOptions = [];
                for(let i=0; i < options.length; i++) {
                    const option = options[i];
                    quickSearchOptions.push(<option key={i} value={option.value}>{option.name}</option>);
                }
                return quickSearchOptions;
            },
            searchList: (list) => {
                const cards = list.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="col s12 m12 l6">
                                <SimpleCardComponent
                                    item={item} genres={this.props.app.movieGenreMap}
                                    gotoItem={this.gotoMovie}
                                    saveFav={this.saveFav}
                                    saveWatchlist={this.saveWatchlist}
                                    type={'movie'}>
                                </SimpleCardComponent>
                            </div>
                            {
                                (index % 2 === 1) ? (
                                    <div className="clearfix"></div>
                                ) : ''
                            }
                        </div>
                    );
                });
                return cards;
            }
        }
        return uiElements;
    }

    /**
     * Main mathod to render UI
     * @returns {XML}
     */
    render() {
        const list = this.prepareList(this.props.movies.search.list);
        const styles = this.inlineStyles();
        const loadActions = this.loadMoviesByType();
        if (this.props.movies.search.list.length > 0) {
            return (
                <div>
                    <div className="row">
                        <FilterComponent type="movies"
                            genres={this.props.app.movieGenres}
                            sortOptions = {movieSortOptions}
                            quickSearchOptions = {moviesQuickSearchOptions}
                            search = {loadActions.searchMovies}
                            discover = {loadActions.discoverMovies}
                            quickSearch = {loadActions.loadMoviesByQuickSearch}>
                        </FilterComponent>
                        <div className="col s12 m8 l9">  
                            {this.uiElements().searchList(list)}
                        </div>
                    </div>
                    {!this.state.loading &&
                        (<div className="right">
                            <PaginationComponent
                                pages={this.props.movies.search.totalPages}
                                activePage={this.state.activePage}
                                pageSelect={this.pageSelect}>
                            </PaginationComponent>
                        </div>)
                    }
                    <div className="clear"></div>
                </div>
            );
        } else {
            return <div/>;
        }
        
    }
}

MoviesSearchListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MoviesSearchListComponent;