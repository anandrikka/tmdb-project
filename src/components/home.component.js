'use strict';

import React, { Component, PropTypes } from 'react';

import MaterialCard from './card.component';
import css from '../styles/home.scss';
import LoadingComponent from './loading.component';
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
                        this.props.home.nowPlaying.list.map(function (item, index) { 
                            return (
                                <Col xs={12} sm={4} key={index}>
                                    <Thumbnail href="#" src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} style={{height:'200px'}}/>
                                </Col>
                            );
                        })
                    }
                </div>
            </div>
            
        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;