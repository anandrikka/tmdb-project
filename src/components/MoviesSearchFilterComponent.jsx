import React, { Component } from 'react';
import { movieSortOptions, moviesQuickSearchOptions } from '../utilities/AppData';
import { languageCountryCodes, languageCodeList, countryCodes } from '../../dist/assets/data/language-countries';
import { Ratings } from '../utilities/AppConstants';

export default class MoviesFilter extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const releasedBeforePicker = $('#released_before').pickadate({
            selectMonths:true,
            selectYears:10
        }).pickadate('picker');
        releasedBeforePicker.on('close', ()=> {
            $(document.activeElement).blur();
            const releasedBeforeDate = releasedBeforePicker.get('select', 'yyyy-mm-dd');
            releasedBeforePicker.set('select', this.props.data.discover['release_date.gte']);
            this.props.actions.releasedBeforeChanged(releasedBeforeDate);
        });
        const releasedAfterPicker = $('#released_after').pickadate({
            selectMonths:true,
            selectYears:10
        }).pickadate('picker');
        releasedAfterPicker.on('close', ()=> {
            $(document.activeElement).blur();
            const releasedAfterDate = releasedAfterDate.get('select', 'yyyy-mm-dd');
            this.props.actions.releasedAfterChanged(releasedAfterDate);
        });
    }

    render() {
        const actions = this.props.actions;
        const data = this.props.data;
        return (
            <div className="row col s12 z-depth-3 filter-box search-filter search-background">
                <div className="row no-bm">
                    <div className="col s12">
                        <p className="search-select-label">Quick Search</p>
                        <select className="browser-default" value={data.quickSearchType}
                                onChange={(e) => actions.quickSearchChanged(e.target.value)}>
                            {
                                moviesQuickSearchOptions.map((quickSearch, index) => {
                                    return (
                                        <option key={index} value={quickSearch.value}>
                                            {quickSearch.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className=" col s12">
                        <p className="movie-select-label">Region</p>
                        <select className="browser-default" value={data.region}
                                onChange={(e) => actions.regionChanged(e.target.value)}>
                            {
                                countryCodes.map((countryCode, index) => {
                                    return (
                                        <option key={index} value={countryCode.code}>
                                            {countryCode.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input id="movie_search_text" type="text"  placeholder="Transformers, Cars etc.."
                            value={data.search.query}
                            onChange={(e) => actions.queryChanged(e.target.value)} />
                        <label htmlFor="movie_search_text" className="active">
                            Search Text (min 3 letters)
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 no-tm">
                        <input type="checkbox" checked={data.include_adult}
                               className="filled-in" id="include_adult"
                               onChange={(e) => actions.includeAdultChanged(e.target.checked)}/>
                        <label htmlFor="include_adult">Include Adult</label>
                    </div>
                </div>
                <div className="divider" />
                <div className="row">
                    <h6>Genres</h6>
                    <div className="genre-scroll">
                        {
                            this.props.genres.map((genre, index) => {
                                return (
                                    <div className="input-field col s12 no-p" key={index}>
                                        <input type="checkbox" className="filled-in"
                                               id={'genre_' + genre.id}
                                               checked ={data.discover.with_genres.indexOf(genre.id) > -1 ? true:false}
                                               onChange={() => actions.genreChanged(genre.id)}/>
                                        <label htmlFor={'genre_'+genre.id}>{genre.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Original Language</p>
                        <select className="browser-default" value={data.discover.with_original_language}
                                onChange={(e) => actions.originalLanguageChanged(e.target.value)}>
                            <option key={-1} value=""></option>
                            {
                                languageCodeList.map((language, index) => {
                                    return (
                                        <option key={index} value={language.code}>
                                            {language.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Order By</p>
                        <select className="browser-default" value={data.discover.sort_by}
                                onChange={(e) => actions.sortByChanged(e.target.value)}>
                            {
                                movieSortOptions.map((sortOption, index) => {
                                    return <option key={index} value={sortOption.value}>{sortOption.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017"
                               className="datepicker" id="released_before"/>
                        <label htmlFor="released_before" className="active">Released Before</label>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017"
                               className="datepicker" id="released_after"/>
                        <label htmlFor="released_after" className="active">Released After</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <p className="movie-select-label">Min Rating</p>
                        <select id="min_rating" className="browser-default"
                                value={data.discover['vote_average.gte']}
                                onChange={(e) => actions.minRatingChanged(e.target.value)}>
                            <option value="" key={-1} defaultValue>Any</option>
                            {
                                Ratings.map((rating, index) => {
                                    return <option key={index} value={rating}>{rating}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col s6">
                        <p className="movie-select-label">Max Rating</p>
                        <select id="max_rating" className="browser-default"
                                value={data.discover['vote_average.lte']}
                                onChange={(e) => actions.maxRatingChanged(e.target.value)}>
                            <option value="" key={-1} defaultValue>Any</option>
                            {
                                Ratings.map((rating, index) => {
                                    return <option key={index} value={rating}>{rating}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="min_vote_count" type="number"
                               placeholder="0" className="validate"
                               value={data.discover['vote_count.gte']}
                               onChange={(e) => actions.minVoteCountChanged(e.target.value)}/>
                        <label htmlFor="min_vote_count" className="active">Min Vote Count</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="max_vote_count" type="number" placeholder="999" className="validate"
                               value={data.discover['vote_count.lte']}
                               onChange={(e) => actions.maxVoteCountChanged(e.target.value)}/>
                        <label htmlFor="max_vote_count" className="active">Max Vote Count</label>
                    </div>
                </div>
            </div>
        )
    }
}