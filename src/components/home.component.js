'use strict';

import React, { Component, PropTypes } from 'react';

import MaterialCard from './card.component';
import css from '../styles/home.scss';
import LoadingComponent from './loading.component';

class HomeComponent extends Component {

    componentDidMount () {
        this.props.actions.fetchMovies();
    }
    
    renderCards() {
        
    }

    render() {
        return (
            <div className="container">
                <LoadingComponent isLoading={this.props.home.nowPlaying.isLoading}></LoadingComponent>
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