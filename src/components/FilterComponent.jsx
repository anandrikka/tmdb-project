import React, { Component } from 'react';

import { COUNTRY_LANGUAGE_LIST } from '../../dist/assets/data/language-countries';

class FilterComponent extends Component {
    render() {
        return (
            <div className="col s12 m4 l3 z-depth-2 filter-box" style={{marginTop:'0.5rem'}}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="search_text" type="text" className="validate" />
                        <label htmlFor="search_text">Search Text</label>
                    </div>
                </div>
                <div className="input-field col s12 no-p">
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
                <div className="row">
                    <div className="input-field col s12 no-p">
                        <input type="checkbox" className="filled-in" id="movie_include_adult"/>
                        <label htmlFor="movie_include_adult">Include Adult</label>
                    </div>    
                </div>
                <h6>Genres</h6>
                <div className="row" style={{ maxHeight: '300px', overflowY: 'scroll', marginTop: '5px' }}>
                    {
                        this.props.movieGenres.map((genre, index) => {
                            return (
                                <div className="input-field col s12 no-p" key={index}>
                                    <input type="checkbox" className="filled-in" id={'movie_genre_'+genre.id}/>
                                    <label htmlFor={'movie_genre_'+genre.id}>{genre.name}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default FilterComponent;
