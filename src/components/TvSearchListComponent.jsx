'use strict';

import React, { Component, PropTypes } from 'react';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import { tvSortOptions, tvQuickSearchOptions } from '../utilities/AppData';
import { Ratings } from '../utilities/AppConstants';
import css from '../styles/filter-box.scss';

class TvSearchListComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            activePage: 1,
            searchType: 'quickSearch',
            quickSearchType: 'onAir'
        }
        this.loadQuickSearch = this.loadQuickSearch.bind(this);
        this.pageSelect = this.pageSelect.bind(this);
    }

    componentDidMount() {
        this.loadQuickSearch();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m4 l3">
                        <SearchFilter genres={this.props.app.tvGenres}></SearchFilter>
                    </div>
                    <div className="col s12 m8 l9">
                        <SearchList list={this.props.tv.search.list}
                                    gotoTv={this.gotoTv}
                                    saveToFav={this.saveToFav}
                                    saveToWatchlist={this.saveToWatchlist}
                                    movieGenres={this.props.app.tvGenreMap}/>
                        <div className="right">
                            <PaginationComponent
                                pages={this.props.tv.search.totalPages}
                                activePage={this.state.activePage}
                                pageSelect={this.pageSelect}>
                            </PaginationComponent>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    pageSelect() {

    }

    loadQuickSearch() {
        const quickSearchQuery = {};
        switch (this.props.quickSearchType) {
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

    gotoTv() {

    }

    saveToFav() {

    }

    saveToWatchlist() {

    }

}

TvSearchListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default TvSearchListComponent;

class SearchFilter extends Component {

    componentDidMount() {
        $('#released_before').pickadate().pickadate('picker');
        $('#released_after').pickadate().pickadate('picker');
    }

    render() {
        return (
            <div className="row col s12 z-depth-3 filter-box search-filter search-background">
                <div className="row">
                    <div className="col s12">
                        <p className="search-select-label">Quick Search</p>
                        <select className="browser-default">
                            {
                                tvQuickSearchOptions.map((quickSearch, index) => {
                                    return <option key={index}
                                        value={quickSearch.value}>{quickSearch.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="tv_search_text" type="text" />
                        <label htmlFor="tv_search_text" className="active">
                            Search Text (min 3 letters)
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Language</p>
                        <select className="browser-default">

                        </select>
                    </div>
                </div>
                <div className="row">
                    <h6>Genres</h6>
                    <div className="genre-scroll">
                        {
                            this.props.genres.map((genre, index) => {
                                return (
                                    <div className="input-field col s12 no-p" key={index}>
                                        <input type="checkbox" className="filled-in" id={'genre_' + genre.id} />
                                        <label htmlFor={'genre_'+genre.id}>{genre.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Order By</p>
                        <select className="browser-default">
                            {
                                tvSortOptions.map((sortOption, index) => {
                                    return <option key={index} value={sortOption.value}>{sortOption.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_before"/>
                        <label htmlFor="released_before" className="active">Air Date Before</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_after"/>
                        <label htmlFor="released_after" className="active">Air Date After</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Min Rating</p>
                        <select id="min_rating" className="browser-default">
                            <option value="" key={-1} defaultValue>Any</option>
                            {
                                Ratings.map((rating, index) => {
                                    return <option key={index} value={rating}>{rating}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    
}

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
                title: listItem.original_name,
                overview: listItem.overview,
                date: listItem.first_air_date,
                vote_average: listItem.vote_average
            });
        }
        return modifiedList;
    }
}