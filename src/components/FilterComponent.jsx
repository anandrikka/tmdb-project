import React, { Component } from 'react';

import { COUNTRY_LANGUAGE_LIST } from '../../dist/assets/data/language-countries';
import { Ratings } from '../Utilities/AppConstants';

class FilterComponent extends Component {

    componentDidMount () {
        
    }
        

    render() {
        const type = this.props.type;
        return (
            <div className="col s12 m4 l3 z-depth-2 filter-box" style={{marginTop:'0.5rem'}}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="search_text" type="text" className="validate" />
                        <label htmlFor="search_text">Search Text</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <select>
                            <option value="en-US" defaultValue>United States</option>
                            {
                                COUNTRY_LANGUAGE_LIST.map((countryLanguage, index) => {
                                    return <option key={index} value={countryLanguage.language}
                                        defaultValue>{countryLanguage.country}</option>
                                })
                            }
                        </select>
                        <label>Language</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 no-p">
                        <input type="checkbox" className="filled-in" id="include_adult"/>
                        <label htmlFor="include_adult">Include Adult</label>
                    </div>    
                </div>
                <h6>Genres</h6>
                <div className="row" style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '5px' }}>
                    {
                        this.props.movieGenres.map((genre, index) => {
                            return (
                                <div className="input-field col s12 no-p" key={index}>
                                    <input type="checkbox" className="filled-in" id={'genre_'+genre.id}/>
                                    <label htmlFor={'genre_'+genre.id}>{genre.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" className="datepicker" id="released_before"/>
                        <label htmlFor="released_before">Released Before</label>
                    </div>    
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="date" className="datepicker" id="released_after"/>
                        <label htmlFor="released_after">Released After</label>
                    </div>    
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <select>
                            <option value="" defaultValue>Any</option>
                            {
                                Ratings.map((rating, index) => {
                                    return <option key={index} value={rating}
                                        defaultValue>{rating}</option>
                                })
                            }
                        </select>
                        <label>Min Rating</label>
                    </div>
                    <div className="input-field col s6">
                        <select>
                            <option value="" defaultValue>Any</option>
                            {
                                Ratings.map((rating, index) => {
                                    return <option key={index} value={rating}
                                        defaultValue>{rating}</option>
                                })
                            }
                        </select>
                        <label>Max Rating</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="min_vote_count" type="text" className="validate" />
                        <label htmlFor="min_vote_count">Min Vote Count</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="max_vote_count" type="text" className="validate" />
                        <label htmlFor="max_vote_count">Max Vote Count</label>
                    </div>
                </div>
            </div>
        )
    }
}

FilterComponent.propTypes = {
    type: React.PropTypes.string.isRequired
}

export default FilterComponent;
