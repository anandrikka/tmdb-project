'use strict';

import React, { Component, PropTypes } from 'react';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent';
import { Col, Thumbnail } from 'react-bootstrap';

class HomeComponent extends Component {

    componentDidMount () {
        this.props.fetchMovies();
        this.props.fetchTvAiringToday();
    }
    
    renderCards() {
        {this.props.home.nowPlaying.list.map(function(item, index){
            return <MaterialCard details={item} key={index}></MaterialCard>
        })}
    }

    cardComponent(item, index) {
        let card = {
            height: '350px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            position: 'relative',
            zIndex:'9999'
        };
        return (
            <div className="col-xs-12 col-sm-3" key={index}>
                <div style={card}>
                    <div style={{ position: 'absolute', color:'#fff', right:'0', padding:'10px' }}>
                        <span className="fa fa-heart-o fa-2x"></span>
                    </div>
                    <img className="img-responsive" style={{ maxHeight: '300px', width: '100%' }} src={'https://image.tmdb.org/t/p/w500' + item.poster_path} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <LoadingComponent isLoading={this.props.homeData.nowPlaying.isLoading}></LoadingComponent>
                <h2>Movies in Theaters</h2>
                <div className="row">
                    {
                        this.props.homeData.nowPlaying.list.map((item, index) => {
                            return this.cardComponent(item, index);
                        })
                    }
                </div>
                <h2>Television Airings Today</h2>
                <div className="row">
                    {
                        this.props.homeData.tvAiringToday.list.map((item, index) => {
                            return this.cardComponent(item, index);
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