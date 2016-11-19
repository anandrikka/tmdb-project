'use strict';

import React, { Component, PropTypes } from 'react';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent';
import { Col, Thumbnail } from 'react-bootstrap';

class HomeComponent extends Component {

    componentDidMount () {
        this.props.actions.fetchMovies();
    }
    
    renderCards() {
        {this.props.home.nowPlaying.list.map(function(item, index){
            return <MaterialCard details={item} key={index}></MaterialCard>
        })}
    }

    render() {
        return (
            <div className="container">
                <LoadingComponent isLoading={this.props.home.nowPlaying.isLoading}></LoadingComponent>
                <div className="row">
                    {
                        this.props.home.nowPlaying.list.map((item, index) => {
                            return (
                                <div className="col-xs-12 col-sm-3" key={index}>
                                    <img className="img-responsive" style={{maxHeight:'300px', width:'100%'}} src={'https://image.tmdb.org/t/p/w500' + item.poster_path} />
                                </div>
                            );
                        })
                    }
                    
                    <div className="col-xs-12 col-sm-3">
                        
                    </div>
                </div>
            </div>
            
        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;