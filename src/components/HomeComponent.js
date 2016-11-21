'use strict';

import React, { Component, PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';

import css from '../styles/home.scss';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import CardComponent from './CardComponent';
import SimplePaginationComponent from './SimplePaginationComponent';


class HomeComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mActivePage: 1,
			tvActivePage: 1,
			uActivePage: 1
		}
		this.mPrevPageSelect = this.mPrevPageSelect.bind(this);
		this.mNextPageSelect = this.mNextPageSelect.bind(this);
		this.tvPrevPageSelect = this.tvPrevPageSelect.bind(this);
		this.tvNextPageSelect = this.tvNextPageSelect.bind(this);
		this.uPrevPageSelect = this.uPrevPageSelect.bind(this);
		this.uNextPageSelect = this.uNextPageSelect.bind(this);
	}

	componentDidMount () {
		this.props.fetchMovies().then(() => {
			let mLength =  this.props.homeData.nowPlaying.list.length;
			this.setState({
				mStartIndex: 0,
				mStopIndex: mLength > 8 ? (8-1): (mLength-1),
				mTotalPages: Math.ceil(this.props.homeData.nowPlaying.totalResults/8)
			})
		});
		this.props.fetchTvAiringToday().then(() => {
			let tvLength = this.props.homeData.tvAiringToday.list.length;
			this.setState({
				tStartIndex: 0,
				tStopIndex: tvLength > 8 ? (8-1) : (tvLength-1),
				tTotalPages: Math.ceil(this.props.homeData.tvAiringToday.totalResults/8)
			})
		});
		this.props.fetchUpcomingMovies().then(() => {
			let upcomingLength = this.props.homeData.upcomingMovies.list.length;
			this.setState({
				uStartIndex: 0,
				uStopIndex: upcomingLength > 8 ? (8-1) : (upcomingLength-1),
				uTotalPages: Math.ceil(this.props.homeData.upcomingMovies.totalResults/8)
			})
		});
	}
	
	prevPageSelect(activePage, type) {
		if(activePage < 1) {
			return;
		}
		if(type === 'nowPlaying') {
			this.setState({
				mStartIndex: (activePage - 1) * 8,
				mStopIndex: (activePage * 8) - 1,
				mActivePage: activePage
			})
		}else if(type === 'airingToday') {
			this.setState({
				tStartIndex: (activePage - 1) * 8,
				tStopIndex: (activePage * 8) - 1,
				tActivePage: activePage
			})
		}else if(type === 'upcoming') {
			this.setState({
				uStartIndex: (activePage - 1) * 8,
				uStopIndex: (activePage * 8) - 1,
				uActivePage: activePage
			})
		}
		
	}
	
	nextPageSelect(activePage, totalPages, totalItems, type) {
		if(activePage > totalPages) {
			return;
		}
		let serverPage = (totalItems/20) + 1;
		if(totalItems < (activePage * 8)){
			this.props.fetchMovies(serverPage).then(()=>{
				setState.bind(this)(type);
			})
		}else {
			setState.bind(this)(type);
		}
		
		function setState(type) {
			if(type==='nowPlaying') {
				this.setState({
					mStartIndex: (activePage-1) * 8,
					mStopIndex: (activePage * 8) - 1,
					mActivePage: activePage
				});
			}else if(type==='airingToday') {
				this.setState({
					tStartIndex: (activePage-1) * 8,
					tStopIndex: (activePage * 8) - 1,
					tvActivePage: activePage
				});
			}else if(type === 'upcoming') {
				this.setState({
					uStartIndex: (activePage-1) * 8,
					uStopIndex: (activePage * 8) - 1,
					uActivePage: activePage
				});
			}
		
		}
	}
	
	mPrevPageSelect() {
		this.prevPageSelect(this.state.mActivePage-1, 'nowPlaying');
	}
	
	mNextPageSelect() {
		this.nextPageSelect(this.state.mActivePage+1, this.state.mTotalPages, 
			this.props.homeData.nowPlaying.list.length, 'nowPlaying');
	}
	
	tvPrevPageSelect() {
		this.prevPageSelect(this.state.tvActivePage-1, 'airingToday');
	}
	
	tvNextPageSelect() {
		this.nextPageSelect(this.state.tvActivePage+1, this.state.tTotalPages, 
			this.props.homeData.tvAiringToday.list.length, 'airingToday');
	}
	
	uPrevPageSelect() {
		this.prevPageSelect(this.state.uActivePage-1, 'upcoming');
	}
	
	uNextPageSelect() {
		this.nextPageSelect(this.state.uActivePage+1, this.state.uTotalPages, 
			this.props.homeData.upcomingMovies.list.length, 'upcoming');
	}
	
	render() {
		let nowPlaying = this.props.homeData.nowPlaying;
		let tvAiringToday = this.props.homeData.tvAiringToday;
		let upcomingMovies = this.props.homeData.upcomingMovies;
		return (
			<div className="container">
				<h2>Movies in Theaters</h2>
				<LoadingComponent isLoading={nowPlaying.isLoading}></LoadingComponent>
				<Row>
					{
						nowPlaying.list.map((item, index) => {
							if (index >= this.state.mStartIndex && index <= this.state.mStopIndex) {
								return (<CardComponent item={item} key={index}></CardComponent>);
							}
						})
					}
				</Row>
				{
					nowPlaying.list.length > 0 ? 
					<SimplePaginationComponent totalPages={this.state.mTotalPages} 
						page={this.state.mActivePage} 
						totalResults={nowPlaying.totalResults} prevPageSelect={this.mPrevPageSelect}
						nextPageSelect={this.mNextPageSelect}>
					</SimplePaginationComponent> : null
				}
				<div className="clearfix"></div>
				<h2>Television Airings Today</h2>
				<LoadingComponent isLoading={tvAiringToday.isLoading}></LoadingComponent>
				<Row>
					{
						tvAiringToday.list.map((item, index) => {
							if (index >= this.state.tStartIndex && index <= this.state.tStopIndex) {
								return (<CardComponent item={item} key={index}></CardComponent>);
							}
						})
					}
				</Row>
				{
					tvAiringToday.list.length > 0 ? 
					<SimplePaginationComponent totalPages={this.state.tTotalPages} 
						page={this.state.tvActivePage} 
						totalResults={tvAiringToday.totalResults} prevPageSelect={this.tvPrevPageSelect}
						nextPageSelect={this.tvNextPageSelect}>
					</SimplePaginationComponent> : null
				}
				<h2>Upcoming Movies</h2>
				<LoadingComponent isLoading={upcomingMovies.isLoading}></LoadingComponent>
				<Row>
					{
						upcomingMovies.list.map((item, index) => {
							if (index >= this.state.uStartIndex && index <= this.state.uStopIndex) {
								return (<CardComponent item={item} key={index}></CardComponent>);
							}
						})
					}
				</Row>
				{
					upcomingMovies.list.length > 0 ? 
					<SimplePaginationComponent totalPages={this.state.uTotalPages} 
						page={this.state.uActivePage} 
						totalResults={upcomingMovies.totalResults} prevPageSelect={this.uPrevPageSelect}
						nextPageSelect={this.uNextPageSelect}>
					</SimplePaginationComponent> : null
				}
			</div>
			
		);
	}
}

HomeComponent.propTypes = {

};

export default HomeComponent;