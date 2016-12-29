import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { languageCountryCodes, countryCodes } from '../../dist/assets/data/language-countries';
import { Ratings } from '../utilities/AppConstants';

class FilterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quickSearch: 'nowPlaying',
            language: 'en-US',
            region: 'US',
            search: {
                query: '',
                include_adult: false
            },
            discover: {
                include_adult: false,
                with_genres: [],
                sort_by: 'popularity.desc',
                'release_date.gte': '',
                'vote_average.gte': '',
                'vote_average.lte': '',
                'vote_count.gte': '',
                'vote_count.lte': ''
            },
            searchTimeout: null,
            minVoteCountTimeout: null,
            maxVoteCountTimeout: null
        }
        //bindings of all methods to class to use props
        this.filterActions = this.filterActions.bind(this);
    }

    componentDidMount() {
        const releasedBeforePicker = $('#released_before').pickadate().pickadate('picker');
        releasedBeforePicker.on('close', ()=> {
            $(document.activeElement).blur();
            const state = this.state;
            state.search.query = '';
            state.discover['release_date.lte'] = releasedBeforePicker.get('select', 'yyyy-mm-dd');
            this.setState(state);
            this.props.discover(this.state);
        });
        const releasedAfterPicker = $('#released_after').pickadate().pickadate('picker');
        releasedAfterPicker.on('close', ()=> {
            $(document.activeElement).blur();
            const state = this.state;
            state.search.query = '';
            state.discover['release_date.gte'] = releasedAfterPicker.get('select', 'yyyy-mm-dd');
            this.setState(state);
            this.props.discover(this.state);
        });
    }

    filterActions() {
        const actions = {
            searchTextChanged: (e) => {
                const state = this.state;
                state.quickSearch = '';
                state.search.query = e.target.value;
                this.setState(state);
                if(this.state.searchTimeout) {
                    clearTimeout(this.state.searchTimeout);
                }
                this.setState({
                    searchTimeout: setTimeout(function() {
                        this.props.search(this.state);
                    }.bind(this), 1000)
                });
            },
            quickSearchChanged: (e) => {
                const state = this.state;
                state.quickSearch = e.target.value;
                state.search.query = '';
                this.setState(state);
                this.props.quickSearch(this.state);
            },
            languageChanged: (e) => {
                const state = this.state;
                state.language = e.target.value,
                this.setState(state);
                if (this.state.search.query.length > 0) {
                    this.props.search(this.state);
                } else if(this.state.quickSearch) {
                    this.props.quickSearch(this.state);
                }else {
                    this.props.discover(this.state);
                }
            },
            regionChanged: (e) => {
                const state = this.state;
                state.region = e.target.value;
                this.setState(state);
                if (this.state.search.query.length > 0) {
                    this.props.search(this.state);
                } else if(this.state.quickSearch) {
                    this.props.quickSearch(this.state);
                }else {
                    this.props.discover(this.state);
                }
            },
            includeAdultChanged: (e) => {
                const state = this.state;
                state.search.include_adult = e.target.checked;
                state.discover.include_adult = e.target.checked;
                state.quickSearch = '';
                this.setState(state);
                if (this.state.search.query.length > 0) {
                    this.props.search(this.state);
                } else {
                    this.props.discover(this.state);
                }
            },
            genreChanged: (id) => {
                const state = this.state;
                state.search.query = '';
                state.quickSearch = '';
                let genres = state.discover.with_genres;
                var index = genres.indexOf(id);
                if(index > -1) {
                    genres.splice(index, 1);
                } else {
                    genres.push(id);
                }
                this.setState(state);
                this.props.discover(this.state);
            },
            sortByChanged: (e) => {
                const state = this.state;
                state.search.query = '';
                state.discover.sort_by = e.target.value;
                this.setState(state);
                this.props.discover(this.state);
            },
            minRatingChanged: (e) => {
                const state = this.state;
                state.discover.min_rating = e.target.value;
                this.setState(state);
                this.props.discover(this.state);
            },
            maxRatingChanged: (e) => {
                const state = this.state;
                state.discover.max_rating = e.target.value;
                this.setState(state);
                this.props.discover(this.state);
            },
            minVoteCountChanged: (e) => {
                const state = this.state;
                state.discover.min_vote_count = e.target.value;
                this.setState(state);
                if(this.state.minVoteCountTimeout) {
                    clearTimeout(this.state.minVoteCountTimeout);
                }
                this.setState({
                    minVoteCountTimeout: setTimeout(function() {
                        this.props.discover(this.state);
                    }.bind(this), 1000)
                });
            },
            maxVoteCountChanged: (e) => {
                const state = this.state;
                state.discover.max_vote_count = e.target.value;
                this.setState(state);
                if(this.state.maxVoteCountTimeout) {
                    clearTimeout(this.state.maxVoteCountTimeout);
                }
                this.setState({
                    maxVoteCountTimeout: setTimeout(function() {
                        this.props.discover(this.state);
                    }.bind(this), 1000)
                });
            }
        }
        return actions;
    }

    /**
     * Build Necessary UI Elements and pass them as a functions
     */
    uiElements() {
        const uiElements = {
            languageOptions: () => {
                const languageOptions = [];
                for (let i = 0; i < languageCountryCodes.length; i++) {
                    const languageOption = languageCountryCodes[i];
                    languageOptions.push(
                        <option key={i} value={languageOption.language}>
                            {languageOption.name}
                        </option>
                    );
                }
                return languageOptions;
            },
            regionOptions: () => {
                const regionOptions = [];
                for (let i = 0; i < countryCodes.length; i++) {
                    const countryCode = countryCodes[i];
                    regionOptions.push(
                        <option key={i} value={countryCode.code}>
                            {countryCode.name}
                        </option>
                    );
                }
                return regionOptions;
            },
            ratings: () => {
                const ratings = [];
                ratings.push(<option value="" key={-1} defaultValue>Any</option>);
                for (let i = 0; i < Ratings.length; i++) {
                    const rating = Ratings[i];
                    ratings.push(<option key={i} value={rating}>{rating}</option>);
                }
                return ratings;
            },
            sortOptions: (options) => {
                const sortOptions = [];
                for (let i = 0; i < options.length; i++) {
                    const option = options[i];
                    sortOptions.push(<option key={i} value={option.value}>{option.name}</option>);
                }
                return sortOptions;
            },
            quickSearchOptions: (options) => {
                const quickSearchOptions = [];
                for(let i=0; i < options.length; i++) {
                    const option = options[i];
                    quickSearchOptions.push(<option key={i} value={option.value}>{option.name}</option>);
                }
                return quickSearchOptions;
            }
        };
        return uiElements;
    }

    /**
     *Render
     */
    render() {
        // console.log('FilterComponent', this.props);
        const type = this.props.type;
        const filterActions = this.filterActions();
        const languageOptions = this.uiElements().languageOptions();
        const ratings = this.uiElements().ratings();
        const sortOptions = this.uiElements().sortOptions(this.props.sortOptions);
        const quickSearchOptions = this.uiElements().quickSearchOptions(this.props.quickSearchOptions);
        const regionOptions = this.uiElements().regionOptions();

        return (
            <div className="col s12 m4 l3 z-depth-3 filter-box movie-filter"
                style={{ marginTop: '0.5rem', backgroundColor: '#fff' }}>
                <div className="row">
                    <div className="col s12">
                        <p className="movie-select-label">Quick Search</p>
                        <select value={this.state.quickSearch}
                                onChange={filterActions.quickSearchChanged} className="browser-default">
                            {quickSearchOptions}
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input id="search_text" type="text" className="active"
                               onChange={filterActions.searchTextChanged}
                               placeholder="Harry Potter, Avengers etc.."
                               value={this.state.search.query || ''} />
                        <label htmlFor="search_text" className="active">
                            Search Text (min 3 letters)
                        </label>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="col s12">
                        <p className="movie-select-label">Language</p>
                        <select className="browser-default" value={this.state.language}
                            onChange={filterActions.languageChanged}>
                            {languageOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className=" col s12">
                        <p className="movie-select-label">Region</p>
                        <select className="browser-default" value={this.state.region}
                                onChange={filterActions.regionChanged}>
                            {regionOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 no-p no-tm">
                        <input type="checkbox" value={this.state.search.include_adult}
                            className="filled-in" id="include_adult" onChange={filterActions.includeAdultChanged}/>
                        <label htmlFor="include_adult">Include Adult</label>
                    </div>
                </div>
                <div className="row">
                    <h6>Genres</h6>
                    <div style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '5px' }}>
                        {
                            this.props.genres.map((genre, index) => {
                                return (
                                    <div className="input-field col s12 no-p" key={index}>
                                        <input type="checkbox"
                                            onChange={() => filterActions.genreChanged(genre.id)}
                                            className="filled-in" id={'genre_' + genre.id} />
                                        <label htmlFor={'genre_'+genre.id}>{genre.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <p className="movie-select-label" style={{margin: '0 0.90em'}}>Order By</p>
                    <div className="col s12">
                        <select className="browser-default" id="sort_option"
                                value={this.state.discover.sort_by}
                                onChange={filterActions.sortByChanged}>
                            {sortOptions}
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_before"/>
                        <label htmlFor="released_before" className="active">Released Before</label>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_after"/>
                        <label htmlFor="released_after" className="active">Released After</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <p className="movie-select-label">Min Rating</p>
                        <select id="min_rating" className="browser-default"
                                value={this.state.discover.min_rating}
                                onChange={filterActions.minRatingChanged}>
                            {ratings}
                        </select>
                    </div>
                    <div className="col s6">
                        <p className="movie-select-label">Max Rating</p>
                        <select id="max_rating" className="browser-default"
                                value={this.state.discover.max_rating}
                                onChange={filterActions.maxRatingChanged}>
                            {ratings}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="min_vote_count" type="number"
                               placeholder="0" className="validate"
                                value={this.state.discover.min_vote_count}
                                onChange={filterActions.minVoteCountChanged}/>
                        <label htmlFor="min_vote_count" className="active">Min Vote Count</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="max_vote_count" type="number" placeholder="999" className="validate"
                               value={this.state.discover.max_vote_count}
                               onChange={filterActions.maxVoteCountChanged}/>
                        <label htmlFor="max_vote_count" className="active">Max Vote Count</label>
                    </div>
                </div>
            </div>
        )
    }
}

FilterComponent.propTypes = {
    type: React.PropTypes.string.isRequired,
    sortOptions: React.PropTypes.array.isRequired,
    genres: React.PropTypes.array.isRequired
}

export default FilterComponent;
