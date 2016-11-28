'use strict';

import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import CardComponent from './CardComponent';
import SimplePaginationComponent from './SimplePaginationComponent';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';


class HomeComponent extends Component {

	constructor(props) {
        super(props);
        this.state = {
			loading:true
		}
	}

	componentDidMount () {
        axios.all([this.props.fetchMovies(),
        this.props.fetchTvAiringToday(),
        this.props.fetchUpcomingMovies()]).then((data) => {
            this.setState({
				loading: false
			})
        }, (error) => {
			
		})
        // this.props.fetchMovies();
        // this.props.fetchTvAiringToday();
        // this.props.fetchUpcomingMovies();
        
	}
	
    render() {
		let nowPlaying = this.props.homeData.nowPlaying;
		let tvAiringToday = this.props.homeData.tvAiringToday;
        let upcomingMovies = this.props.homeData.upcomingMovies;
        let getImageClass = (index) => {
            if (index%4 == 1) {
				return 'img-200';
			}
			if (index%3 === 0) {
				return 'img-300';
			}
			if (index%7 === 0) {
				return 'img-150';
			}
		}
        return (
			<div className="container">
                {
                    !this.state.loading ? (
                        <div>
							<h3>Movies in Theaters</h3>
							<section className="home-photos">
								{
									nowPlaying.list.map((item, index) => {
										return (
                                            <img style={{ cursor: 'pointer' }} key={index}
                                                className={getImageClass(index)}
												src={IMAGE_URI_ORIGINAL + (item.poster_path)}
												onError={(e)=>{$(e.target).remove()}}/>
										);
									})
								}
							</section>
							<div className="clearfix"></div>
							<h3>Television Airings Today</h3>
							<section className="home-photos">
								{
									tvAiringToday.list.map((item, index) => {
										return (
                                            <img key={index} style={{ cursor: 'pointer' }}
                                                className={getImageClass(index)}
												src={IMAGE_URI_ORIGINAL + (item.poster_path)}
												onError={(e)=>{$(e.target).remove()}}/>
										);
									})
								}
							</section>
							<h3>Upcoming Movies</h3>
							<section className="home-photos">
								{
									upcomingMovies.list.map((item, index) => {
										return (
                                            <img key={index} style={{ cursor: 'pointer' }}
                                                className={getImageClass(index)}
												src={IMAGE_URI_ORIGINAL + (item.poster_path)}
												onError={(e)=>{$(e.target).remove()}}/>
										);
									})
								}
							</section>
                        </div>
                    ) : (<LoadingComponent isLoading={this.state.loading}></LoadingComponent>)
				}
			</div>
			
		);
	}
}

HomeComponent.propTypes = {

};

export default HomeComponent;