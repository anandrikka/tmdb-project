import React, {Component} from 'react';
import { tvSortOptions, tvQuickSearchOptions } from '../utilities/AppData';
import { languageCountryCodes, languageCodeList } from '../../dist/assets/data/language-countries';
import { Ratings } from '../utilities/AppConstants';

export default class TvFilter extends Component {

    componentDidMount() {
        const minFirstAirDate = $('#min_first_air_date').pickadate({closeOnSelect: true}).pickadate('picker');
        minFirstAirDate.on('close', ()=> {
            $(document.activeElement).blur();
            const selectedDate = minFirstAirDate.get('select', 'yyyy-mm-dd');
            this.props.actions.minAirDateChanged(selectedDate);
        });
        const maxFirstAirDate = $('#max_first_air_date').pickadate().pickadate('picker');
        maxFirstAirDate.on('close', ()=> {
            $(document.activeElement).blur();
            const selectedDate = maxFirstAirDate.get('select', 'yyyy-mm-dd');
            this.props.actions.maxAirDateChanged(selectedDate);
        });
        const firstAirDateYear = $('#tv_first_air_date').pickadate({selectMonths:true, selectYears: 10, format:'yyyy'}).pickadate('picker');
        firstAirDateYear.on('close', ()=> {
            $(document.activeElement).blur();
            const selectedDate = firstAirDateYear.get('select', 'yyyy');
            this.props.actions.firstAirDateYearChanged(selectedDate);
        });
    }

    render() {
        const actions = this.props.actions;
        const data = this.props.data;
        return (
            <div className="row col s12 z-depth-3 filter-box search-filter search-background">
                <div className="row">
                    <div className="col s12">
                        <p className="search-select-label">Quick Search</p>
                        <select className="browser-default" value={data.quickSearchType}
                                onChange={(e) => actions.quickSearchTypeChanged(e.target.value)}>
                            {
                                tvQuickSearchOptions.map((quickSearch, index) => {
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
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input id="tv_search_text" type="text"  placeholder="Prison Break, Vikings etc.."
                               value={data.search.query} onChange={(e) => actions.queryChanged(e.target.value)}/>
                        <label htmlFor="tv_search_text" className="active">
                            Search Text (min 3 letters)
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Translation Language</p>
                        <select className="browser-default" value={data.language}
                                onChange={(e) => actions.translationLangChanged(e.target.value)}>
                            {
                                languageCountryCodes.map((languageCode, index) => {
                                    return (
                                        <option key={index} value={languageCode.language}>
                                            {languageCode.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" placeholder="2017" className="datepicker" id="tv_first_air_date"/>
                        <label htmlFor="tv_first_air_date" className="active">Air Date Year</label>
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
                                onChange={(e) => actions.sortBy(e.target.value)}>
                            {
                                tvSortOptions.map((sortOption, index) => {
                                    return <option key={index} value={sortOption.value}>{sortOption.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="min_first_air_date"/>
                        <label htmlFor="min_first_air_date" className="active">Minimum Air Date</label>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="max_first_air_date"/>
                        <label htmlFor="max_first_air_date" className="active">Maximum Air Date</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <p className="movie-select-label">Min Rating</p>
                        <select id="min_rating" className="browser-default" value={data.discover['vote_average.gte']}
                                onChange={(e) => actions.ratingChanged(e.target.value)}>
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