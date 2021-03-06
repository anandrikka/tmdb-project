import React, { Component, PropTypes } from 'react';
import Rating from 'react-rating';
import Slider from 'react-slick';
import numeral from 'numeral';

import Casting from './CastingComponent.jsx';
import Crew from './CrewComponent.jsx';
import MovieGallery from './SimilarOrRecommenedComponent.jsx';
import ItemImageGallery from './ItemImageGallery.jsx';
import VideoModal from './VideoModalComponent.jsx';
import ItemLabel from './ItemLabelComponent.jsx';

import { OriginalImageUrl, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import {formatDate} from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';


class MovieDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.goBack = this.goBack.bind(this);
        this.ratingSelected = this.ratingSelected.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
        this.gotoCast = this.gotoCast.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
    }
    
    componentDidUpdate() {
        $('ul.tabs').tabs();
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

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.actions.fetchMovie(nextProps.params.id);
        }
    }
    

    ratingSelected(rating, event) {
        this.props.actions.rateMovie(this.props.params.id, rating);
    }

    goBack() {
        this.context.router.goBack();
    }

    gotoMovie(id) {
        this.context.router.push(`/movies/${id}`);
    }

    gotoCast(id) {
        this.context.router.push(`/people/${id}`);
    }

    render() {
        const movie = this.props.movies.movie_results[this.props.params.id];
        if (movie) {
            const releaseDate = formatDate(movie.release_date);
            let backdropSrc = '../../dist/assets/images/placeholder-backdrop.jpg';
            if (movie.backdrop_path) {
                backdropSrc = OriginalImageUrl + movie.backdrop_path;
            }
            const divStyle = {
                backgroundImage: 'url(' + backdropSrc + ')'
            }
            let posterSrc = '../../dist/assets/images/placeholder-movie.jpg';
            if (movie.poster_path) {
                posterSrc = OriginalImageUrl + movie.poster_path;
            }
            return (
                <div> 
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>
                    <div className="back-button hide-on-small-only">
                        <i className="fa fa-long-arrow-left fa-2x pointer" onClick={this.goBack}/> 
                        <p>Go Back</p>
                    </div>
                    <div className="movie card-panel">
                        <div className="row no-bm">
                            <div className="col s12 m3">   
                                <img className="responsive-img"
                                    src={posterSrc} />
                                <a className="btn waves-effect waves-light w100" onClick={this.openDialog}>Watch Trailer 
                                    <i className="fa fa-youtube-play left" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="col s12 m9">
                                { /*<h5 className="right mcolor">
                                    <span className="fa fa-heart-o pointer"></span> &nbsp;
                                    <span className="fa fa-bookmark-o pointer"></span>
                                </h5> */ }    
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
                                    <ItemLabel className="col s6 m3" label="Release Date"
                                        value={releaseDate} />
                                    <ItemLabel className="col s6 m3" label="Play Time"
                                        value={movie.runtime} />
                                    <ItemLabel className="col s6 m3" label="Language"
                                        value={languageCodeNames[movie.original_language] || 'NA'} />
                                    <ItemLabel className="col s6 m3" label="IMDB ID"
                                        value={movie.imdb_id || 'NA'} />
                                </div>
                                <div className="row no-bm">
                                    <ItemLabel className="col s6 m3" label="Budget"
                                        value={movie.budget ?
                                            numeral(movie.budget).format('$ 0,0.00') : 'NA'} />
                                    <ItemLabel className="col s6 m3" label="Revenue"
                                        value={movie.revenue ?
                                            numeral(movie.revenue).format('$ 0,0.00') : 'NA'} />
                                    <ItemLabel className="col s6 m3" label="Status"
                                        value={movie.status} />
                                </div>
                                <div className="row no-bm">
                                    <div className="col s12">
                                        <p className="inline-block"
                                            style={{ paddingRight: '15px' }}><b>Rating: </b></p>
                                        <Rating empty="fa fa-star-o"
                                            full="fa fa-star" fractions={2} stop={10}
                                            initialRate={movie.vote_average}
                                            onClick={this.ratingSelected}
                                            readonly={this.props.app.userInfo.authenticationFailed}/>
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
                                                    <Casting cast={movie.credits.cast}
                                                        goto={this.gotoCast} id="movieCast" />
                                                </div>
                                                <Crew crew={movie.credits.crew} goto={this.gotoCast}/>
                                            </div>
                                        ): <div>No Cast & Crew Details Found !!</div>    
                                }    
                                
                            </div> 
                             <div id="movie_similar" className="col s12">
                                 <h5 className="center-align">Similar Movies</h5>
                                 {
                                    movie.similar.results.length > 0 ? (
                                        <div style={{ padding: '0 25px' }}>
                                            <MovieGallery id={movie.id} fetchMore={this.props.actions.similarMovies} nameKey="title" title="Similar Movies" goto={this.gotoMovie}
                                                gallery={movie.similar} />
                                        </div>
                                    ): <div className="center-align"><p>No Similar Movies Found</p></div>
                                 }
                                 <h5 className="center-align">Recommended Movies For You</h5>
                                 {
                                    movie.recommendations.results.length > 0 ? (
                                        <div style={{ padding: '0 25px' }}>
                                            <MovieGallery id={movie.id}
                                                fetchMore={this.props.actions.recommendedMovies}
                                                nameKey="title" title="Recommended Movies"
                                                goto={this.gotoMovie}
                                                gallery={movie.recommendations} />
                                        </div>
                                    ) : <div className="center-align">
                                            <p>Not able to find recommendations !</p></div>
                                 }
                            </div>
                            <div id="movie_images" className="col s12">
                                {
                                    (movie.images.posters.length > 0
                                        || movie.images.backdrops.length > 0) ? 
                                        (
                                            <div style={{ padding: '0 25px' }}>
                                                <ItemImageGallery posters={movie.images.posters}
                                                    backdrops={movie.images.backdrops} />
                                            </div>
                                        ): (<div className="center-align">No Results Found !</div>)
                                }
                            </div>
                        </div>
                    </div>
                    <VideoModal isOpen={this.state.openDialog} closeDialog={this.closeDialog}
                        video={movie.videos.results[0]} />
                </div>
            )
        }else {
            return (<div></div>);
        }
    }
}

MovieDetailsComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default MovieDetailsComponent;