'use strict';

import React, { Component, PropTypes } from 'react';

import MaterialCard from './card.component';
import css from '../styles/home.scss';

class HomeComponent extends Component {

    componentDidMount () {
        this.props.actions.fetchMovies();
    }
    
    renderCards() {
        let movies = this.props.home.latestMovies.list;
        
    }

    render() {
        
        let obj = {};
        return (
            <div className="container">
                <div className="row">
                    {this.props.home.nowPlaying.list.map(function(item, index){
                        return <MaterialCard details={item} key={index}></MaterialCard>
                    })}
                </div>
            </div>
            
        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;