import React, {Component, PropTypes} from 'react';
import { IMAGE_URI_ORIGINAL, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import {formatDate} from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';
import numeral from 'numeral';

class MovieDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
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

    render() {
        const movie = this.props.movies.movie_results[this.props.params.id];
        if (movie) {
            const releaseDate = formatDate(movie.release_date);
            const divStyle = {
                backgroundImage: 'url(' + IMAGE_URI_ORIGINAL + movie.backdrop_path + ')'
            }
            return (
                <div> 
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>  
                    <div className="movie card-panel">
                        <div className="row">
                            <div className="col s12 m3">   
                                <img className="responsive-img"
                                    src={IMAGE_URI_ORIGINAL + movie.poster_path} />
                                <a className="btn waves-effect waves-light w100">Watch Trailer
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
                                        <ChipInfo id={genre.id} key={index}
                                            name={genre.name} selected={this.genreSelected}/>
                                    )
                                })}
                                <p>{movie.overview}</p>
                                <div className="row">
                                    <MovieLabel className="col s6 m3"
                                        name="Release Date:" value={releaseDate} />
                                    <MovieLabel className="col s6 m2"
                                        name="Play Time:" value={movie.runtime}/>
                                    <MovieLabel className="col s6 m3"
                                        name="Language:" value={languageCodeNames[movie.original_language]} />
                                </div>
                                <div className="row">
                                    <div className="valign-wrapper">
                                        <MovieLabel className="col s1" name="Rating:" />
                                        <div className="col s11">
                                            <span className="inline-block" id="movieRating" />
                                            <span> ({movie.vote_average})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <MovieLabel className="col s6 m3"
                                        name="Budget: "
                                        value={movie.budget ? numeral(movie.budget).format('$ 0,0.00') : 'NA'}/>
                                   <MovieLabel className="col s6 m3"
                                        name="Revenue: "
                                        value={movie.revenue ? numeral(movie.revenue).format('$ 0,0.00') : 'NA'}/>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block">Tags:</p>  &nbsp;   
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
                                <ul className="tabs tabs-fixed-width">
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
                                <h5 className="center-align">CAST</h5>
                                <div style={{padding: '0 25px'}}>
                                    <Casting cast={movie.credits.cast} />
                                </div>
                                <h5 className="center-align">CREW MEMBERS</h5>
                                <CrewMembers crew={movie.credits.crew} />
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
                </div>
            )
        }else {
            return (<div></div>);
        }
    }
}

export default MovieDetailsComponent;

class ChipInfo extends Component {
    render() {
        return (
            <div className="mitem-chip">
                <span className="pointer"
                    onClick={() => this.props.selected(this.props.id)}>{this.props.name}</span>
            </div>
        )
    }
}

class MovieLabel extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <label>{this.props.name}</label> {this.props.value && this.props.value}
            </div>
        );
    }
}

class Casting extends Component {
    componentDidMount() {
        $('#castSlick').slick({
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
        return (
            <div id="castSlick" >
                {
                    this.props.cast.map((actor, index) => {
                        const profile_path = actor.profile_path;
                        let src = '../../dist/assets/images/placeholder-profile.jpg'; 
                        if (profile_path && profile_path !== null && profile_path.length > 0) {
                            src = H632ImageUrl + actor.profile_path;
                        }
                        return (
                            <div className="col s6 m4 l3" key={index} >
                                <div className="relative">
                                    <img className="responsive-img pointer"
                                        key={index} data-lazy={src} />
                                    <span className="cast-title">
                                        {actor.name} ({actor.character})
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

class CrewMembers extends Component {
    
    processCrewMembers(crewMembers) {
        let crew = {};
        for (let i = 0; i < crewMembers.length; i++) {
            const crewMember = crewMembers[i];
            const department = crewMember.department;
            if (crew[department]) {
                crew[department].push(crewMember);
            } else {
                crew[department] = [];
                crew[department].push(crewMember);
            }
        }
        return crew;
    }
    
    render() {
        const crew = this.processCrewMembers(this.props.crew);
        return (
            <div>
                {
                    this.props.crew.map((cItem, index) => {
                        const profile_path = cItem.profile_path;
                        let imageTag;
                        if(profile_path && profile_path !== null) {
                            const src = W154ImageUrl + cItem.profile_path;
                            imageTag = <img src={src} className="responsive-img"/>
                        }else {
                            let name = '';
                            let nameSplit = cItem.name.split(' ');
                            if(nameSplit.length > 0) {
                                nameSplit.forEach(function(n){
                                    name = name + n.substr(0, 1);
                                })
                            }else {
                                name = cItem.name.substr(0, 2);
                            }
                            imageTag = (<div className="responsive-img valign-wrapper"><h5 className="valign">{name}</h5></div>);
                        }
                        return (
                            <div className="col s12 m2 l4" key={index}>
                                <div className="card horizontal crew-card">
                                    <div className="card-image">
                                        {imageTag}
                                    </div>
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <p><b>{cItem.name}</b></p>
                                            <p>{cItem.job}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

CrewMembers.PropTypes = {
    crew: React.PropTypes.array.isRequired
};

class SimilarMovies extends Component {

    componentDidMount() {
        $('#similar_movies').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 4,
            slidesToScroll: 4,
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

    componentWillUpdate () {
        // let src = '../../dist/assets/images/placeholder-movie.jpg';
        // const x = (
        //     `<div className="col s6 m4 l3">
        //         <div className="relative">
        //             <img className="responsive-img pointer" data-lazy=${src} />
        //             <span className="cast-title">
        //                 Test
        //             </span>
        //         </div>
        //     </div>`
        // )
        // $('#similar_movies').slick('slickAdd', x);
    }

    render() {
        console.log('Similar', this.props);
        const similarMovies = this.props.similar.results;
        return (
            <div id="similar_movies" >
                {
                    similarMovies.map((movie, index) => {
                        const poster_path = movie.poster_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            src = IMAGE_URI_ORIGINAL + poster_path;
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
                            src = IMAGE_URI_ORIGINAL + poster_path;
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
                            src = IMAGE_URI_ORIGINAL + image_path;
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
