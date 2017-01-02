'use strict';

import React, { Component, PropTypes } from 'react';
import { OriginalImageUrl } from '../utilities/AppConstants';
import { formatDate } from '../utilities/AppUtils';
import axios from 'axios';
import css from '../styles/home.scss';

class HomeComponent extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
        console.log('component mounted');
        this.props.actions.upcomingMovies().then(() => {
            $('#home_screen').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                arrows: false,
                autoplay:true,
                autoplaySpeed:2000,
                pauseOnFocus: false
            });
        });

        const responsiveSettings = [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    centerPadding: '20px',
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    centerPadding: '20px',
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerPadding: '20px',
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ];

        this.props.actions.fetchMovies().then(() => {
            $('#home_now_playing').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: responsiveSettings
            });
        });

        this.props.actions.fetchTvAiringToday().then(() => {
            $('#home_tv_airing_today').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: responsiveSettings
            });
        });
	}

    componentWillUnmount () {
        $('#home_screen').slick('unslick');
        $('#home_now_playing').slick('unslick')
        $('#home_tv_airing_today').slick('unslick');
    }

	render() {
        const upcoming = this.props.home.upcoming.list;
        const nowPlaying = this.props.home.nowPlaying.list;
        const airingToday = this.props.home.tvAiringToday.list;
        return (
            <div>
                {
                    upcoming.length > 0 && (
                        <div id="home_screen" className="row">
                            {
                                upcoming.map((movie, index) => {
                                    const backdrop_path = movie.backdrop_path;
                                    if (backdrop_path && backdrop_path !== null && backdrop_path.length > 0) {
                                        const src = OriginalImageUrl + backdrop_path;
                                        return (
                                            <div className="col s12" key={index} >
                                                <div className="relative home-carousel">
                                                    <div className="home-carousel-overlay"></div>
                                                    <img className="responsive-img pointer"
                                                         data-lazy={src} />
                                                    <div className="home-carousel-title hide-on-small-only" style={{top: '10%', left:'3%', width: '40%'}}>
                                                        <h3>{movie.original_title}</h3>
                                                        <h5>{movie.overview}</h5>
                                                    </div>
                                                    <div className="upcoming-title hide-on-med-and-up">
                                                        <p>{movie.original_title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                }
                {
                    nowPlaying.length > 0 && (
                        <div>
                            <h5>WATCH IN THEATERS NOW</h5>
                            <div style={{padding: '0 25px'}}>
                                <HomeCarousel id="home_now_playing" list={nowPlaying}></HomeCarousel>
                            </div>
                        </div>
                    )
                }
                {
                    airingToday && (
                        <div>
                            <h5>WATCH TODAY IN TV</h5>
                            <div style={{padding: '0 25px'}}>
                                <HomeCarousel id="home_tv_airing_today" list={airingToday}></HomeCarousel>
                            </div>
                        </div>
                    )
                }
            </div>
        )
	}
}

export default HomeComponent;

class HomeCarousel extends Component {
    render() {
        return (
            <div id={this.props.id} className="row">
                {
                    this.props.list.map((movie, index) => {
                        const poster_path = movie.poster_path;
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            const src = OriginalImageUrl + poster_path;
                            return (
                                <div className="col s12 m4 l3" key={index} >
                                    <img className="responsive-img pointer"
                                         data-lazy={src} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
