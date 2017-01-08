'use strict';

import React, { Component, PropTypes } from 'react';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import TvFilter from './TvSearchFilterComponent.jsx';
import { tvSortOptions, tvQuickSearchOptions } from '../utilities/AppData';
import * as AppConstants from '../utilities/AppConstants';
import { commaSeparate} from '../utilities/AppUtils';
import css from '../styles/filter-box.scss';

class TvSearchListComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            activePage: 1,
            searchType: 'quickSearch',
            filter: {
                quickSearchType: 'onAir',
                language: 'en-US',
                region: '',
                search: {
                    query: ''
                },
                discover: {
                    with_genres: [],
                    ['vote_average.gte']:'',
                    ['first_air_date.lte']: null,
                    ['first_air_date.gte']: null,
                    with_original_language:'',
                    sort_by: 'popularity.desc'
                }
            }
        };

        this.actions = {
            quickSearchTypeChanged: this.quickSearchTypeChanged.bind(this),
            queryChanged: this.queryChanged.bind(this),
            translationLangChanged: this.translationLangChanged.bind(this),
            genreChanged: this.genreChanged.bind(this),
            sortBy: this.sortBy.bind(this),
            minAirDateChanged: this.minAirDateChanged.bind(this),
            maxAirDateChanged: this.maxAirDateChanged.bind(this),
            originalLanguageChanged: this.originalLanguageChanged.bind(this),
            firstAirDateYearChanged: this.firstAirDateYearChanged.bind(this),
            searchTimeout: null,
            firstAirDateYearTimeout:null
        };

        this.loadQuickSearch = this.loadQuickSearch.bind(this);
        this.pageSelect = this.pageSelect.bind(this);
        this.gotoTv = this.gotoTv.bind(this);
        this.saveToFav = this.saveToFav.bind(this);
        this.saveToWatchlist = this.saveToWatchlist.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.loadQuickSearch();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4 l3">
                        <TvFilter genres={this.props.app.tvGenres}
                                  actions={this.actions}
                                  data={this.state.filter}/>
                    </div>
                    <div className="col s12 m8 l9">
                        <SearchList list={this.props.tv.search.list}
                                    gotoTv={this.gotoTv}
                                    saveToFav={this.saveToFav}
                                    saveToWatchlist={this.saveToWatchlist}
                                    tvGenres={this.props.app.tvGenreMap} />
                        {
                            this.props.tv.search.list.length > 0 && (
                                <div className="right">
                                    <PaginationComponent
                                        pages={this.props.tv.search.totalPages}
                                        activePage={this.state.activePage}
                                        pageSelect={this.pageSelect}>
                                    </PaginationComponent>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
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

    loadQuickSearch() {
        const quickSearchQuery = this.getQuickSearchQuery();
        switch (this.state.filter.quickSearchType) {
            case 'topRated': {
                this.props.actions.fetchTopRated(quickSearchQuery);
                break;
            }
            case 'popular': {
                this.props.actions.fetchPopular(quickSearchQuery);
                break;
            }
            case 'today': {
                this.props.actions.fetchTodaySerials(quickSearchQuery);
                break;
            }
            case 'onAir': {
                this.props.actions.fetchOnAir(quickSearchQuery);
                break;
            }
            default:
                this.props.actions.fetchOnAir(quickSearchQuery);
        }
    }

    loadBySearch() {
        const searchQuery = this.getSearchQuery();
        this.props.actions.searchTv(searchQuery);
    }

    loadByDiscover() {
        const discoverQuery = this.getDiscoverQuery();
        discoverQuery.with_genres = commaSeparate(discoverQuery.with_genres);
        this.props.actions.discoverTv(discoverQuery);
    }

    gotoTv(id) {
        this.context.router.push('tv/' + id);
    }

    saveToFav(id) {
        const accountId = this.props.app.userInfo.id;
        if(accountId) {
            this.props.actions.saveFavorite(accountId, AppConstants.MEDIA_TYPE_TV, id, true);
        }
    }

    saveToWatchlist(id) {
        const accountId = this.props.app.userInfo.id;
        if(accountId) {
            this.props.actions.saveWatchlist(accountId, AppConstants.MEDIA_TYPE_TV, id, true);
        }
    }

    quickSearchTypeChanged(quickSearchType) {
        const state = this.state;
        state.filter.quickSearchType = quickSearchType;
        state.searchType = 'quickSearch';
        state.activePage = 1;
        state.filter.discover = this.resetDiscover();
        state.filter.search = this.resetSearch();
        this.setState(state);
        this.loadQuickSearch();
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

    translationLangChanged(lang) {
        const state = this.state;
        state.filter.language = lang;
        state.searchType = 'search';
        this.setState(state);
        if(state.searchType === 'search') {
            this.loadBySearch();
        }else if(state.searchType === 'discover') {
            this.loadByDiscover();
        }else {
            this.loadQuickSearch();
        }
    }

    firstAirDateYearChanged(year) {
        const state = this.state;
        state.filter.search.first_air_date_year = year
        this.setState(state);
        if(state.filter.search.query.length > 0) {
            this.loadBySearch();
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

    sortBy(sortBy) {
        const state = this.state;
        state.filter.discover.sort_by = sortBy;
        state.searchType = 'discover';
        this.setState(state);
    }
    
    ratingChanged(rating) {
        const state = this.state;
        state.filter.discover['vote_average.gte'] = rating;
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }

    minAirDateChanged(date) {
        const state = this.state;
        state.filter.discover['first_air_date.gte'] = date;
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }

    maxAirDateChanged(date) {
        const state = this.state;
        state.filter.discover['first_air_date.lte'] = date;
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }
    
    originalLanguageChanged(lang) {
        const state = this.state;
        state.filter.discover.with_original_language = lang;
        state.searchType = 'discover';
        this.setState(state);
        this.loadByDiscover();
    }
    
    getQuickSearchQuery() {
        const query = {
            language: this.state.filter.language,
            page: this.state.activePage
        };
        return query;
    }
    
    getSearchQuery() {
        const query = {
            language: this.state.filter.language,
            page: this.state.activePage
        }
        Object.assign(query, this.state.filter.search);
        return query;
    }

    getDiscoverQuery() {
        const query = {
            language: this.state.filter.language,
            page: this.state.activePage
        }
        Object.assign(query, this.state.filter.discover);
        return query;
    }

    resetDiscover() {
        return {
            with_genres: [],
            sort_by: '',
            ['vote_average.gte']:'',
            ['first_air_date.lte']: null,
            ['first_air_date.gte']: null,
            with_original_language:'en'
        };
    }

    resetSearch() {
        return {
            query: ''
        };
    }
    
}

TvSearchListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default TvSearchListComponent;

class SearchList extends Component {
    render() {
        const list = this.prepareList(this.props.list);
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="col s12 m12 l6">
                                    <SimpleCardComponent
                                        item={item}
                                        gotoItem={this.props.gotoTv}
                                        saveFav={this.props.saveToFav}
                                        saveWatchlist={this.props.saveToWatchlist}
                                        type={'tv'}>
                                    </SimpleCardComponent>
                                </div>
                                { index % 2 === 1 && <div className="clearfix"></div> }
                            </div>
                        )
                    })
                }
            </div>
        );
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
                title: listItem.original_name || listItem.original_title,
                overview: listItem.overview,
                date: listItem.first_air_date,
                vote_average: listItem.vote_average
            });
        }
        return modifiedList;
    }
}