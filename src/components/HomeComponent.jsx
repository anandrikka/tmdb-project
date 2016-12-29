'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../utilities/AppConstants';
import axios from 'axios';
import css from '../styles/home.scss';

class HomeComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
		this.toMovies = this.toMovies.bind(this);
		this.toTv = this.toTv.bind(this);
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

	toMovies() {
		this.props.history.push('/movies');
	}

	toTv() {
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
		const styles = this.inlineStyles();
		let nowPlaying = this.props.home.nowPlaying;
		let tvAiringToday = this.props.home.tvAiringToday;
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
			<div>
				<div>
					<h5>Movies in Theaters</h5>
					<section className="home-photos" onClick={this.toMovies}>
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
					<section className="home-photos" onClick={this.toTv}>
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

export default HomeComponent;
