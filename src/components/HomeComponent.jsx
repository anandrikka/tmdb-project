'use strict';

import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
//import axios from 'axios';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SimplePaginationComponent from './SimplePaginationComponent.jsx';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

import axios from '../Utilities/axios';

class HomeComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
		this.gotoMovies = this.gotoMovies.bind(this);
	}

	componentDidMount() {
		axios.all([
			this.props.actions.fetchMovies(),
			this.props.actions.fetchTvAiringToday()
		]).then((data) => {
			this.setState({
				loading: false
			})
		}, (error) => {

		})
	}

	gotoMovies() {
		this.props.history.push('/movies');
	}

	gotoTv() {
		this.props.history.push('/tv');
	}

	inlineStyles() {
		return {
			cursor: {
				cursor: 'pointer'
			}
		}
	}

	render() {
		console.log('HomeComponent: ', this.props);
		const styles = this.inlineStyles();
		let nowPlaying = this.props.homeData.nowPlaying;
		let tvAiringToday = this.props.homeData.tvAiringToday;
		let getImageClass = (index) => {
			if (index % 4 == 1) {
				return 'img-300';
			}
			if (index % 3 === 0) {
				return 'img-400';
			}
			if (index % 7 === 0) {
				return 'img-450';
			}
		}
		return (
			<div className="container">
				<div>
					<h5>Movies in Theaters</h5>
					<section className="home-photos" onClick={this.gotoMovies}>
						{
							nowPlaying.list.map((item, index) => {
								if (item.poster_path) {
									return (
										<img style={styles.cursor} key={index}
											className={getImageClass(index)}
											src={IMAGE_URI_ORIGINAL + (item.poster_path)}
											onError={(e) => { $(e.target).hide() } } />
									);
								}
							})
						}
					</section>
					<div className="clearfix"></div>
					<h5>Television Airings Today</h5>
					<section className="home-photos" onClick={this.gotoTv}>
						{
							tvAiringToday.list.map((item, index) => {
								if (item.poster_path) {
									return (
										<img key={index} style={styles.cursor}
											className={getImageClass(index)}
											src={IMAGE_URI_ORIGINAL + (item.poster_path)}
											onError={(e) => { $(e.target).hide() } } />
									);
								}

							})
						}
					</section>
				</div>
			</div>

		);
	}
}

HomeComponent.propTypes = {

};

export default HomeComponent;
