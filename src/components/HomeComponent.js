'use strict';

import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import CardComponent from './CardComponent';


class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mActivePage: 1,
            tvActivePage: 1,
            umActivePage: 1
        }
        this.mPageSelect = this.mPageSelect.bind(this);
    }

    componentDidMount () {
        this.props.fetchMovies().then(() => {
            let mLength =  this.props.homeData.nowPlaying.list.length;
            this.setState({
                mStartIndex: 0,
                mStopIndex: mLength > 8 ? (8-1): (mLength-1) 
            })
        });
        this.props.fetchTvAiringToday().then(() => {
            let tvLength = this.props.homeData.tvAiringToday.list.length;
            this.setState({
                tvStartIndex: 0,
                tvStopIndex: tvLength > 8 ? (8-1) : (tvLength-1)
            })
        });
        this.props.fetchUpcomingMovies().then(() => {
            let upcomingLength = this.props.homeData.upcomingMovies.list.length;
            this.setState({
                upcomingStartIndex: 0,
                upcomingStopIndex: upcomingLength > 8 ? (8-1) : (upcomingLength-1)
            })
        });
    }

    componentDidUpdate() {
        
    }

    mPageSelect(pageNumber) {
        let stopItemIndex = pageNumber * 8;
        let totalItems = this.props.homeData.nowPlaying.list.length;
        let fetchAdditional = (stopItemIndex > totalItems);
        if (fetchAdditional) {
            let fetchPage = (totalItems / 20) + 1;
            this.props.fetchMovies(fetchPage).then(() => {
                this.setState({
                    mStartIndex: (pageNumber-1) * 8,
                    mStopIndex: stopItemIndex - 1,
                    mActivePage: pageNumber
                })
            });
        } else {
            this.setState({
                mStartIndex: (pageNumber-1) * 8,
                mStopIndex: stopItemIndex - 1,
                mActivePage: pageNumber
            })
        }
    }    

    render() {
        let nowPlayingList = this.props.homeData.nowPlaying.list;
        let tvList = this.props.homeData.tvAiringToday.list;
        let upcomingMoviesList = this.props.homeData.upcomingMovies.list;
        return (
            <div className="container">
                <h2>Movies in Theaters</h2>
                <LoadingComponent isLoading={this.props.homeData.nowPlaying.isLoading}></LoadingComponent>
                <Row>
                    {
                        this.props.homeData.nowPlaying.list.map((item, index) => {
                            if (index >= this.state.mStartIndex && index <= this.state.mStopIndex) {
                                console.log(this.state.mStartIndex, index, this.state.mStopIndex);
                                return (<CardComponent item={item} key={index}></CardComponent>);
                            }
                        })
                    }
                </Row>
                <div style={{ float: 'right' }}>
                    {this.props.homeData.nowPlaying.list.length > 0 ? <PaginationComponent pages={20} 
                        activePage={this.state.mActivePage}
                        pageSelect={this.mPageSelect}></PaginationComponent> : null}    
                </div>
                <div className="clearfix"></div>
                <h2>Television Airings Today</h2>
                <LoadingComponent isLoading={this.props.homeData.tvAiringToday.isLoading}></LoadingComponent>
                <Row>
                    {
                        this.props.homeData.tvAiringToday.list.map((item, index) => {
                            return <CardComponent item={item} key={index}></CardComponent>
                        })
                    }
                </Row>
                <h2>Upcoming Movies</h2>
                <LoadingComponent isLoading={this.props.homeData.upcomingMovies.isLoading}></LoadingComponent>
                <Row>
                    {
                        this.props.homeData.upcomingMovies.list.map((item, index) => {
                            return <CardComponent item={item} key={index}></CardComponent>
                        })
                    }
                </Row>
            </div>
            
        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;