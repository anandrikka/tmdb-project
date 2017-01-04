'use strict';

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import * as AppConstants from '../utilities/AppConstants';
import { movieSortOptions, moviesQuickSearchOptions } from '../utilities/AppData';
import { commaSeparate} from '../utilities/AppUtils';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import MoviesFilter from './MoviesSearchFilterComponent.jsx';

class MoviesSearchListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1,
            searchType: 'quickSearch',
            filter: {
                quickSearchType: 'nowPlaying',
                language: 'en-US',
                region: '',
                include_adult: false,
                search: {
                    query: ''
                },
                discover: {
                    with_genres: [],
                    sort_by: 'popularity.desc',
                    with_original_language: '',
                    'release_date.gte': '',
                    'release_date.lte': '',
                    'vote_average.gte': '',
                    'vote_average.lte': '',
                    'vote_count.gte': '',
                    'vote_count.lte': ''
                }
            }
        }

        this.actions = {
            quickSearchChanged: this.quickSearchChanged.bind(this),
            queryChanged: this.queryChanged.bind(this),
            translationLangChanged: this.translationLangChanged.bind(this),
            regionChanged: this.regionChanged.bind(this),
            includeAdultChanged: this.includeAdultChanged.bind(this),
            genreChanged: this.genreChanged.bind(this),
            sortByChanged: this.sortByChanged.bind(this),
            minRatingChanged: this.minRatingChanged.bind(this),
            maxRatingChanged: this.maxRatingChanged.bind(this),
            minVoteCountChanged: this.minVoteCountChanged.bind(this),
            maxVoteCountChanged: this.maxVoteCountChanged.bind(this),
            originalLanguageChanged: this.originalLanguageChanged.bind(this),
            releasedBeforeChanged: this.releasedBeforeChanged.bind(this),
            releasedAfterChanged: this.releasedAfterChanged.bind(this),
            searchTimeout: null,
            minVoteCountTimeout: null,
            maxVoteCountTimeout: null
        };

        //Bind functions to this that need props
        this.pageSelect = this.pageSelect.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
        this.saveFav = this.saveFav.bind(this);
        this.saveWatchlist = this.saveWatchlist.bind(this);
    }

    componentDidMount() {
        this.loadQuickSearch().then(() => {
            //lazy.init();
        });
    }

    render() {
        const movies = this.props.movies.search.list;
        return (
            <div>
                <div className="row flex-s">
                    <div className="col s12 m4 l3 box-a">
                        <MoviesFilter genres={this.props.app.movieGenres}
                                        actions={this.actions}
                                        data={this.state.filter}/>
                    </div>
                    <div className="col s12 m8 l9 box-b">
                        <SearchList list={movies}
                                    gotoMovie={this.gotoMovie}
                                    saveToFav={this.saveFav}
                                    saveToWatchlist={this.saveWatchlist}
                                    movieGenres={this.props.app.movieGenreMap} />
                        {
                            movies.length > 0 &&
                            <div className="right">
                                <PaginationComponent
                                    pages={this.props.movies.search.totalPages}
                                    activePage={this.state.activePage}
                                    pageSelect={this.pageSelect}>
                                </PaginationComponent>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    loadQuickSearch() {
        const quickSearchQuery = this.getQuickSearchQuery();
        let promise;
        switch (this.state.filter.quickSearchType) {
            case 'topRated': {
                promise = this.props.actions.fetchTopRated(quickSearchQuery);
                break;
            }
            case 'upcoming': {
                promise = this.props.actions.fetchUpcoming(quickSearchQuery);
                break;
            }
            case 'popular': {
                promise =this.props.actions.fetchPopular(quickSearchQuery);
                break;
            }
            default:
                promise = this.props.actions.fetchNowPlaying(quickSearchQuery);
        }
        return promise;
    }

    loadBySearch() {
        const searchQuery = this.getSearchQuery();
        this.props.actions.searchMovies(searchQuery);
    }

    loadByDiscover() {
        const discoverQuery = this.getDiscoverQuery();
        discoverQuery.with_genres = commaSeparate(discoverQuery.with_genres);
        this.props.actions.discoverMovies(discoverQuery);
    }

    pageSelect(page) {
        const state = this.state;
        state.activePage = page;
        this.setState(state);
        if(this.state.searchType === 'search') {
            this.loadBySearch();
        }else if(this.state.searchType === 'discover') {
            this.loadByDiscover();
        }else {
            this.loadQuickSearch()
        }
    }

    gotoMovie(id) {
        this.context.router.push('movies/' + id);
    }

    saveFav(id, flag) {
        const accountId = this.props.app.userInfo.id;
        if(accountId) {
            this.props.actions.saveFavorite(accountId, AppConstants.MEDIA_TYPE_MOVIE, id, flag)
        }
    }

    saveWatchlist(id, flag) {
        const accountId = this.props.app.userInfo.id;
        if(accountId) {
            this.props.actions.saveWatchlist(accountId, AppConstants.MEDIA_TYPE_MOVIE, id, flag);
        }
    }

    queryChanged(query) {
        const state = this.state;
        state.filter.search.query = query;
        state.searchType = 'search';
        state.activePage = 1;
        this.setState(state);
        if(this.actions.searchTimeout) {
            clearTimeout(this.actions.searchTimeout);
        }
        this.actions.searchTimeout = setTimeout(function() {
            this.loadBySearch();
        }.bind(this), 1000);
    }

    quickSearchChanged(quickSearchType) {
        const state = this.state;
        state.filter.quickSearchType = quickSearchType;
        state.searchType = 'quickSearch';
        state.activePage = 1;
        state.filter.discover = this.resetDiscover();
        state.filter.search = this.resetSearch();
        this.setState(state);
        this.loadQuickSearch();
    }

    translationLangChanged(lang) {
        const state = this.state;
        state.filter.language = lang;
        this.setState(state);
        if(state.searchType === 'search') {
            this.loadBySearch();
        }else if(state.searchType === 'discover') {
            this.loadByDiscover();
        }else {
            this.loadQuickSearch();
        }
    }

    regionChanged(region) {
        const state = this.state;
        state.filter.region = region;
        this.setState(state);
        if(state.searchType === 'search') {
            this.loadBySearch();
        }else if(state.searchType === 'discover') {
            this.loadByDiscover();
        }else {
            this.loadQuickSearch();
        }
    }

    includeAdultChanged(isAdultIncluded) {
        const state = this.state;
        state.filter.include_adult = isAdultIncluded;
        this.setState(state);
        if(this.state.filter.search.query.length > 0) {
            this.loadBySearch();
        }else {
            this.loadByDiscover();
        }
    }

    genreChanged(genreId) {
        const state = this.state;
        let genres = state.filter.discover.with_genres;
        var index = genres.indexOf(genreId);
        if(index > -1) {
            genres.splice(index, 1);
        } else {
            genres.push(genreId);
        }
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }

    sortByChanged(sortType) {
        const state = this.state;
        state.filter.discover.sort_by = sortType;
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }

    minRatingChanged(minRating) {
        const state = this.state;
        state.filter.discover['vote_average.gte'] = minRating;
        this.setState(state);
        this.loadByDiscover();
    }

    maxRatingChanged(maxRating) {
        const state = this.state;
        state.filter.discover['vote_average.lte'] = maxRating;
        this.setState(state);
        this.loadByDiscover();
    }

    minVoteCountChanged(minVote) {
        const state = this.state;
        state.filter.discover['vote_count.gte'] = minVote;
        this.setState(state);
        if(this.state.minVoteCountTimeout) {
            clearTimeout(this.state.minVoteCountTimeout);
        }
        this.setState({
            minVoteCountTimeout: setTimeout(function(){
                this.loadByDiscover();
            }.bind(this), 1000)
        })
    }

    maxVoteCountChanged(maxVote) {
        const state = this.state;
        state.filter.discover['vote_count.lte'] = maxVote;
        this.setState(state);
        if(this.state.maxVoteCountTimeout) {
            clearTimeout(this.state.maxVoteCountTimeout);
        }
        this.setState({
            maxVoteCountTimeout: setTimeout(function(){
                this.loadByDiscover();
            }.bind(this), 1000)
        });
    }

    originalLanguageChanged(originalLang) {
        const state = this.state;
        state.filter.discover.with_original_language = originalLang;
        this.setState(state);
        this.loadByDiscover();
    }
    
    releasedBeforeChanged(date) {
        const state = this.state;
        state.filter.discover['release_date.lte'] = date;
        this.setState(state);
        this.loadByDiscover();
    }
    
    releasedAfterChanged(date) {
        const state = this.state;
        state.filter.discover['release_date.gte'] = date;
        this.setState(state);
        this.loadByDiscover();
    }

    getQuickSearchQuery() {
        const query = {
            language: this.state.filter.language,
            region: this.state.filter.region,
            page: this.state.activePage
        };
        return query;
    }

    getSearchQuery() {
        const query = {
            language: this.state.filter.language,
            region: this.state.filter.region,
            page: this.state.activePage,
            include_adult: this.state.filter.include_adult
        }
        Object.assign(query, this.state.filter.search);
        return query;
    }

    getDiscoverQuery() {
        const query = {
            language: this.state.filter.language,
            region: this.state.filter.region,
            page: this.state.activePage,
            include_adult: this.state.filter.include_adult
        }
        Object.assign(query, this.state.filter.discover);
        return query;
    }

    resetDiscover() {
        return {
            with_genres: [],
            sort_by: 'popularity.desc',
            with_original_language: 'en',
            'release_date.gte': '',
            'release_date.lte': '',
            'vote_average.gte': '',
            'vote_average.lte': '',
            'vote_count.gte': '',
            'vote_count.lte': ''
        };
    }

    resetSearch() {
        return {
            query: ''
        };
    }

}

MoviesSearchListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MoviesSearchListComponent;

class SearchList extends Component {
    render() {
        const list = this.prepareList(this.props.list);
        if (list.length > 0) {
            return (
                <div>
                    {
                        list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col s12 m12 l6">
                                        <SimpleCardComponent
                                            item={item}
                                            gotoItem={this.props.gotoMovie}
                                            saveFav={this.props.saveToFav}
                                            saveWatchlist={this.props.saveToWatchlist}
                                            type={'movie'}>
                                        </SimpleCardComponent>
                                    </div>
                                    { index % 2 === 1 && <div className="clearfix"></div> }
                                </div>
                            )
                        })
                    }
                </div>
            );
        } else {
            return (<div style={{ margin: '25px', fontWeight: 800, textAlign: 'center' }}>No Movies Found</div>)
        }
    }

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
}