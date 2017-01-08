import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick'
import { OriginalImageUrl, W300ImageUrl } from '../utilities/AppConstants';
import { formatDate } from '../utilities/AppUtils';
import axios from 'axios';
import css from '../styles/home.scss';

class HomeComponent extends Component {

	componentDidMount() {
        this.props.actions.upcomingMovies();
        this.props.actions.fetchMovies();
        this.props.actions.fetchTvAiringToday();
	}

    render() {
        const upcoming = this.props.home.upcoming.list;
        const nowPlaying = this.props.home.nowPlaying.list;
        const airingToday = this.props.home.tvAiringToday.list;
        const showFlag = upcoming.length > 0 && nowPlaying.length > 0 && airingToday.length > 0;
        return (
            <div>
                {
                    upcoming.length > 0 && (
                        <div className="row">
                            {this.upcomingMoviesSlider(upcoming)}
                        </div>
                    )
                }
                {
                    nowPlaying.length > 0 && (
                        <div>
                            {showFlag && <h5>WATCH IN THEATERS NOW</h5>}
                            <div style={{padding: '0 25px'}}>
                                <HomeSlider items={nowPlaying} id="nowPlaying"/>
                            </div>
                        </div>
                    )
                }
                {
                    airingToday.length && (
                        <div>
                            {showFlag && <h5>WATCH TODAY IN TV</h5>}
                            <div style={{padding: '0 25px'}}>
                                <HomeSlider items={airingToday} id="airingToday"/>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
    
    upcomingMoviesSlider(movies) {
        return (
            <Slider {...upcomingSlider}>
                {
                    movies.map((movie, index) => {
                        const backdrop_path = movie.backdrop_path;
                        if (backdrop_path && backdrop_path !== null && backdrop_path.length > 0) {
                            const src = OriginalImageUrl + backdrop_path;
                            return (
                                <div className="col s12" key={index} >
                                    <div className="relative home-carousel">
                                        <div className="home-carousel-overlay"></div>
                                        <img className="responsive-img pointer"
                                            src={src} />
                                        <div
                                            className="home-carousel-title hide-on-small-only" style={{ top: '10%', left: '3%', width: '40%' }}>
                                            <h3>{movie.original_title}</h3>
                                            <h6>{movie.overview}</h6>
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
            </Slider>
        )    
    }

}



export default HomeComponent;

class HomeSlider extends Component {
    render() {
        return (
            <div className="row">
                <Slider {...normalSlider}>
                    {
                        this.props.items.map((item, index) => {
                            const id = this.props.id + index;
                            const poster_path = item.poster_path;
                            if (poster_path && poster_path !== null && poster_path.length > 0) {
                                const src = W300ImageUrl + poster_path;
                                return (
                                    <div className="col s12 m4 l3" key={id} >
                                        <img className="responsive-img pointer"
                                           src={src} />
                                    </div>
                                )
                            }
                        })
                    }
                </Slider>    
            </div>
        )
    }
}

const upcomingSlider = {
    lazyLoad: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: false
};

const normalSlider = {
    lazyLoad: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
    ]
};
