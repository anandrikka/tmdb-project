import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { COUNTRY_LANGUAGE_LIST } from '../../dist/assets/data/language-countries';
import { Ratings } from '../Utilities/AppConstants';

class FilterComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quickSearch: 'nowPlaying',
            search: {
                query: '',
                language: 'en-US',
                include_adult: false
            },
            discover: {
                with_genres: [],
                sort_by: 'popularity.desc',
                language: 'en-US',
                language: 'en-US',
                include_adult: false
            },
            searchTimeout: null
        }

        //bindings of all methods to class to use props
        this.searchTextChanged = this.searchTextChanged.bind(this);
        this.languageChanged = this.languageChanged.bind(this);
        this.includeAdultChanged = this.includeAdultChanged.bind(this);
        this.genreChanged = this.genreChanged.bind(this);
        this.quickSearchChanged = this.quickSearchChanged.bind(this);
    }

    componentDidMount() {
        // materialize css select onChange doesn't work properly so add this jquery on component mount for select.
        //let languageSelect = $(ReactDOM.findDOMNode(this.refs.languages));
        //languageSelect.on('change', this.languageChanged);
        //let quickSearchSelect = $(ReactDOM.findDOMNode(this.refs.quickSearch));
        //quickSearchSelect.on('change', this.quickSearchChanged);
        //Materialize.updateTextFields();
        console.log('Materialize', Materialize);
        console.log('Materialize', Materialize);
    }

    /**
     *When search text changed
     */
    searchTextChanged(e) {
        const state = this.state;
        state.search.query = e.target.value;
        this.setState(state);
        if(this.state.searchTimeout) {
            clearTimeout(this.state.searchTimeout);
        }
        this.setState({
            searchTimeout: setTimeout(function() {
                this.props.search(this.state.search);
            }.bind(this), 1000)
        });
    }

    /**
     *When language from dropdown changed
     */
    languageChanged(e) {
        const state = this.state;
        state.search.language = e.target.value;
        state.discover.language = e.target.value;
        this.setState(state);
        if (this.state.search.query.length > 0) {
            this.props.search(this.state.search);
        } else {
            this.props.discover(this.state.discover);
        }
    }
    
    /**
     *When include adult checked and unchecked
     */
    includeAdultChanged(e) {
        const state = this.state;
        state.search.include_adult = e.target.checked;
        state.discover.include_adult = e.target.checked;
        this.setState(state);
        if (this.state.search.query.length > 0) {
            this.props.search(this.state.search);
        } else {
            this.props.discover(this.state.discover);
        }
    }

    genreChanged(id) {
        const state = this.state;
        let genres = state.discover.with_genres;
        var index = genres.indexOf(id);
        if(index !== -1) {
            genres.splice(index, 1);
        } else {
            genres.push(id);
        }
        this.setState(state);
        this.props.discover(JSON.parse(JSON.stringify(this.state.discover)));
    }

    quickSearchChanged(e) {
        const state = this.state;
        state.quickSearch = e.target.value;
        this.setState(state);
    }

    /**
     *Language Options
     */
    languageOptions() {
        const languageOptions = [];
        for (let i = 0; i < COUNTRY_LANGUAGE_LIST.length; i++) {
            const languageOption = COUNTRY_LANGUAGE_LIST[i];
            languageOptions.push(
                <option key={i} value={languageOption.language}>
                    {languageOption.country}
                </option>
            );
        }
        return languageOptions;
    }

    /**
     *Ratings Options
     */
    ratings() {
        const ratings = [];
        ratings.push(<option value="" key={-1} defaultValue>Any</option>);
        for (let i = 0; i < Ratings.length; i++) {
            const rating = Ratings[i];
            ratings.push(<option key={i} value={rating}>{rating}</option>);
        }
        return ratings;
    }

    /**
     *Sorting Options
     */
    sortOptions(options) {
        const sortOptions = [];
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            sortOptions.push(<option key={i} value={option.value}>{option.name}</option>);
        }
        return sortOptions;
    }

    /**
     * Quick Search Options
     */
    quickSearchOptions(options) {
        const quickSearchOptions = [];
        for(let i=0; i < options.length; i++) {
            const option = options[i];
            quickSearchOptions.push(<option key={i} value={option.value}>{option.name}</option>);
        }
        return quickSearchOptions;
    }

    /**
     *Render
     */
    render() {
        // console.log('FilterComponent', this.props);
        const type = this.props.type;
        const languageOptions = this.languageOptions();
        const ratings = this.ratings();
        const sortOptions = this.sortOptions(this.props.sortOptions);
        const quickSearchOptions = this.quickSearchOptions(this.props.quickSearchOptions);

        return (
            <div className="col s12 m4 l3 z-depth-2 filter-box" style={{marginTop:'0.5rem'}}>
                <div className="row">
                    <div className="col s12">
                        <label>Quick Search</label>
                        <select value={this.state.quickSearch}
                                onChange={this.quickSearchChanged} className="browser-default">
                            {quickSearchOptions}
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input id="search_text" type="text" className="validate"
                               onChange={this.searchTextChanged} placeholder="Harry Potter, Avengers etc.."
                               value={this.state.search.query || ''}/>
                        <label htmlFor="search_text">Search Text (min 3 letters)</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <label>Language</label>
                        <select className="browser-default" value={this.state.search.language}
                            onChange={this.languageChanged}>
                            {languageOptions}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 no-p no-tm">
                        <input type="checkbox" ref="includeAdult" value={this.state.search.include_adult}
                            className="filled-in" id="include_adult" onChange={this.includeAdultChanged}/>
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
                                            onChange={() => this.genreChanged(genre.id)}
                                            className="filled-in" id={'genre_' + genre.id} />
                                        <label htmlFor={'genre_'+genre.id}>{genre.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="row">
                    <label style={{margin: '0 0.75em'}}>Order By</label>
                    <div className="col s12">
                        <select className="browser-default" id="sort_option">
                            {sortOptions}
                        </select>
                    </div>
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_before"/>
                        <label htmlFor="released_before">Released Before</label>
                    </div>    
                </div>
                <div className="row no-bm">
                    <div className="input-field col s12">
                        <input type="date" placeholder="01-Jan-2017" className="datepicker" id="released_after"/>
                        <label htmlFor="released_after">Released After</label>
                    </div>    
                </div>
                <div className="row">
                    <div className="col s6">
                        <label>Min Rating</label>
                        <select id="min_rating" className="browser-default">
                            {ratings}
                        </select>
                    </div>
                    <div className="col s6">
                        <label>Max Rating</label>
                        <select id="max_rating" className="browser-default">
                            {ratings}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="min_vote_count" type="number" placeholder="0" className="validate" />
                        <label htmlFor="min_vote_count">Min Vote Count</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="max_vote_count" type="number" placeholder="999" className="validate" />
                        <label htmlFor="max_vote_count">Max Vote Count</label>
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
