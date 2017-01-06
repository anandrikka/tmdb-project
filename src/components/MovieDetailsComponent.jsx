import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import Rating from 'react-rating';
import { OriginalImageUrl, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import {formatDate} from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';
import numeral from 'numeral';
import Casting from './CastingComponent.jsx';
import Crew from './CrewComponent.jsx';

class MovieDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state.modalClass = modalClass;
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
        window.addEventListener('resize', function(event){
            const state = this.state;
            if(window.innerWidth < 900 && window.innerWidth > 720) {
                state.modalClass.content.width = '480px';
                state.modalClass.content.height = '320px';
            }else if(window.innerWidth <= 600) {
                state.modalClass.content.width = '320px';
                state.modalClass.content.height = '240px';
            }else if(window.innerWidth > 900) {
                state.modalClass.content.width = '640px';
                state.modalClass.content.height = '360px';
            }
            this.setState(state);
        }.bind(this));
    }
    
    componentDidUpdate() {
        $('ul.tabs').tabs();
        const movie = this.props.movies.movie_results[this.props.params.id];
        let rating = 0;
        if (movie) {
            rating = movie.vote_average;
        }
        $('#movieRating').rateYo({
            starWidth: '18px',
            halfStar: true,
            precision: 5,
            padding: '5px',
            numStars: 10,
            maxValue: 10
        });
        $('#movieRating').rateYo('rating', rating);
    }

    keywordSelected(keyword) {
        console.log('chip clicked', keyword);
    }

    genreSelected(genre) {
        console.log('genre selected', genre);
    }

    openDialog() {
        this.setState({
            openDialog: true
        });
    }

    closeDialog() {
        this.setState({
            openDialog: false
        })
    }

    ratingSelected(rate, event) {
        console.log(rate);
    }

    render() {
        const movie = this.props.movies.movie_results[this.props.params.id];
        if (movie) {
            const releaseDate = formatDate(movie.release_date);
            const divStyle = {
                backgroundImage: 'url(' + OriginalImageUrl + movie.backdrop_path + ')'
            }
            return (
                <div> 
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>  
                    <div className="movie card-panel">
                        <div className="row no-bm">
                            <div className="col s12 m3">   
                                <img className="responsive-img"
                                    src={OriginalImageUrl + movie.poster_path} />
                                <a className="btn waves-effect waves-light w100" onClick={this.openDialog}>Watch Trailer 
                                    <i className="fa fa-youtube-play left" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="col s12 m9">
                                <h5 className="right mcolor">
                                    <span className="fa fa-heart-o pointer"></span> &nbsp;
                                    <span className="fa fa-bookmark-o pointer"></span>
                                </h5>    
                                <h5>
                                    <a href={movie.homepage || '#!'} target="_blank">
                                        {movie.title} ({formatDate(movie.release_date, 'YYYY')})
                                    </a>
                                </h5>
                                {movie.genres.map((genre, index) => {
                                    return (
                                        <div className="mitem-chip" key={index}>
                                            <span className="pointer"
                                                onClick={() => this.genreSelected(genre.id)}>{genre.name}</span>
                                        </div>
                                    )
                                })}
                                <p>{movie.overview}</p>
                                <div className="row no-bm">
                                    <div className="col s6 m3">
                                        <p><b>Release Date</b></p>
                                        <p>{releaseDate}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Play Time</b></p>
                                        <p>{movie.runtime}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Language</b></p>
                                        <p>{languageCodeNames[movie.original_language] || 'NA'}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>IMDB ID</b></p>
                                        <p>{movie.imdb_id || 'NA'}</p>
                                    </div>
                                </div>
                                <div className="row no-bm">
                                    <div className="col s6 m3">
                                        <p><b>Budget</b></p>
                                        <p>{movie.budget ? numeral(movie.budget).format('$ 0,0.00') : 'NA'}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Revenue</b></p>
                                        <p>{movie.revenue ? numeral(movie.revenue).format('$ 0,0.00') : 'NA'}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Status</b></p>
                                        <p>{movie.status}</p>
                                    </div>
                                </div>
                                <div className="row no-bm">
                                    <div className="col s12">
                                        <p className="inline-block"
                                            style={{ paddingRight: '15px' }}><b>Rating: </b></p>
                                        <Rating empty="fa fa-star-o"
                                            full="fa fa-star" fractions={10} stop={10} 
                                            initialRate={movie.vote_average} onClick={this.ratingSelected}/>
                                        <p className="inline-block"
                                            style={{ paddingLeft: '15px' }}>
                                            <b>({movie.vote_average})</b>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block"><b>Tags:</b></p>  &nbsp;   
                                        {
                                            movie.keywords.keywords.map((keyword, index) => {
                                                return (
                                                <div className="mitem-tag pointer" key={index}>{keyword.name}</div>
                                                )
                                            })
                                        }
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m9" style={{marginBottom: '10px'}}>
                                <ul className="tabs tabs-fixed-width tab-color">
                                    <li className="tab col s3 m3">
                                        <a className="active"  href="#movie_cast">Cast & Crew</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#movie_similar">Similar & Recommendations</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#movie_images">Image Gallery</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="movie_cast" className="col s12">
                                {
                                    movie.credits.cast.length > 0 || movie.credits.crew.length > 0 ?
                                        (
                                            <div>
                                                <div style={{ padding: '0 25px' }}>
                                                    <Casting cast={movie.credits.cast} id="movieCast"/>
                                                </div>
                                                <Crew crew={movie.credits.crew} />
                                            </div>
                                        ): <div>No Cast & Crew Details Found !!</div>    
                                }    
                                
                            </div> 
                             <div id="movie_similar" className="col s12">
                                 <h5 className="center-align">Similar Movies</h5>
                                 <div style={{padding: '0 25px'}}>
                                     <SimilarMovies movieId={movie.id} fetchSimilar={this.props.actions.similarMovies}
                                        similar={movie.similar} />
                                 </div>
                                 <h5 className="center-align">Recommended Movies For You</h5>
                                 <div style={{padding: '0 25px'}}>
                                     <RecommendedMovies movieId={movie.id}
                                        recommendations={movie.recommendations} />
                                 </div>
                            </div>
                            <div id="movie_images" className="col s12">
                                <div style={{padding: '0 25px'}}>
                                    <ImageGallery posters={movie.images.posters} backdrops={movie.images.backdrops}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.openDialog}
                        shouldCloseOnOverlayClick={true}
                        contentLabel="Modal"
                        style={this.state.modalClass} onRequestClose={this.closeDialog}>
                        <div className="relative">
                            <i className="fa fa-times-circle-o fa-2x pointer" style={{position:'absolute', left: '100%', color: 'white', bottom: '95%'}} onClick={this.closeDialog}></i>
                            {
                                movie.videos.results.length > 0 ? (
                                    <ReactPlayer 
                                        width={this.state.modalClass.content.width}
                                        height={this.state.modalClass.content.height}
                                        url={'https://www.youtube.com/watch?v='+movie.videos.results[0].key} playing 
                                        controls={true}/>
                                ): (
                                   <div style={{backgroundColor: '#fff', padding: '20px'}}> No Trailer To Play !!</div>
                                )
                            }
                            
                        </div>
                    </Modal>
                </div>
            )
        }else {
            return (<div></div>);
        }
    }
}

export default MovieDetailsComponent;

class SimilarMovies extends Component {

    componentDidMount() {
        $('#similar_movies').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 6,
            slidesToScroll: 6,
            adaptiveHeight: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 3,
                        slidesToScroll: 3,
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
                }
            ]
        });
        $('#similar_movies').on('afterChange', function(slick, c) {
            // const count = c.currentSlide + 4;
            // let page = 1;
            // const pageToGo = count/20;
            // if(pageToGo >= 1 && pageToGo <= this.props.similar.total_pages) {
            //     page = (count/20) + 1;
            //     this.props.fetchSimilar(this.props.movieId, page);
            // }
        }.bind(this))
    }

    render() {
        const similarMovies = this.props.similar.results;
        return (
            <div id="similar_movies" >
                {
                    similarMovies.map((movie, index) => {
                        const poster_path = movie.poster_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            src = OriginalImageUrl + poster_path;
                        }
                        return (
                            <div className="col s6 m4 l3" key={index} >
                                <div className="relative">
                                    <img className="responsive-img pointer" data-lazy={src} />
                                    <span className="cast-title">
                                        {movie.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

SimilarMovies.PropTypes = {
    movieId: React.PropTypes.string.isRequired,
    similar: React.PropTypes.object.isRequired,
    fetchSimilar: React.PropTypes.func.isRequired
}

class RecommendedMovies extends Component {

    componentDidMount() {
        $('#recommended_movies').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
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
                }
            ]
        });

    }

    render() {
        const recommendedMovies = this.props.recommendations.results;

        return (
            <div id="recommended_movies" >
                {
                    recommendedMovies.map((movie, index) => {
                        const poster_path = movie.poster_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            src = OriginalImageUrl + poster_path;
                        }
                        return (
                            <div className="col s6 m4 l3" key={index} >
                                <div className="relative">
                                    <img className="responsive-img pointer"
                                         key={index} data-lazy={src} />
                                    <span className="cast-title">
                                        {movie.title}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

RecommendedMovies.PropTypes = {
    movieId: React.PropTypes.string.isRequired,
    recommendations: React.PropTypes.object.isRequired
}


class ImageGallery extends Component {

    componentDidMount() {
        $('#image_gallery').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('#image_gallery').on('afterChange', function(slick, c) {
            if(c.currentSlide >= this.props.backdrops.length) {
                $('#image_gallery').slick('slickSetOption', 'slidesToShow', 3);
                $('#image_gallery').slick('slickSetOption', 'slidesToScroll', 3);
            }else {
                $('#image_gallery').slick('slickSetOption', 'slidesToShow', 1);
                $('#image_gallery').slick('slickSetOption', 'slidesToScroll', 1);
            }
        }.bind(this))
    }

    render() {
        const images = this.props.backdrops.concat(this.props.posters);
        return (
            <div id="image_gallery" >
                {
                    images.map((image, index) => {
                        const image_path = image.file_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (image_path && image_path !== null && image_path.length > 0) {
                            src = OriginalImageUrl + image_path;
                        }
                        let classImage = 'col s6 m4 l4';
                        let styles = {maxHeight: '400px'}
                        if(index < this.props.backdrops.length) {
                            classImage = 'col s12';
                            styles = {maxHeight: ''};
                        }
                        return (
                            <div className={classImage} key={index} >
                                <div className="relative"  style={styles}>
                                    <img className="responsive-img pointer"
                                         key={index} data-lazy={src} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

ImageGallery.PropTypes = {
    backdrops: React.PropTypes.array.isRequired,
    posters: React.PropTypes.array.isRequired
}


const modalClass = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex:999
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        padding: '0 !important',
        width: '640px',
        height: '360px',
        zIndex: 9999,
        right: '0 !important',
        bottom: '0 !important',
        border: 'none !important',
        overflow: 'none !important',
        borderRadius: '0 !important',
        backgroundColor: 'transparent'
    }
};