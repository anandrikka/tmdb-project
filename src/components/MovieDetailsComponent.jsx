import React, {Component, PropTypes} from 'react';
import data from './sample-data';
import { IMAGE_URI_ORIGINAL, IMAGE_URI_500W } from '../Utilities/AppConstants';
import DateUtils from '../Utilities/date-utils';
import ReactStars from './react-stars';
import { Chip, Tabs, Tab, Modal, Button } from 'react-materialize';
import { languageCodeNames } from '../../dist/assets/data/language-countries';


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
        $('.modal-trigger').leanModal({
            dismissible: true,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
        });
        $('.materialboxed').materialbox();
        $('.collapsible').collapsible();
    }

    movieGenres(movieGenres) {
        let genreString = '';
        for (let i = 0; i < movieGenres.length; i++) {
            const movieGenre = movieGenres[i];
            genreString = genreString + movieGenre.name;
            if (i !== movieGenres.length - 1) {
                genreString = genreString + ', ';
            }
        }
        
    }

    ratingChanged(rating) {
        console.log('rating: ', rating);
    }

    getImageSrc(path) {
        if (path) {
            return IMAGE_URI_ORIGINAL + path;
        } else {
            return '../../dist/assets/images/placeholder-profile.jpg';
        }
    }

    inlineStyles() {
        const styles = {
            mcard: {
                card: {
                    transition: 'box-shadow .25s',
                    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
                },
                textCenter: {
                    display: 'flex',
                    alignItems: 'center'
                },
                fname: {
                    fontSize: '14px',
                    fontWeight: 500,
                    width: '100%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                },
                f12: {
                    fontSize: '12px',
                    width: '99%',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: 'block'
                },
                image: {
                    marginLeft: '5px',
                    marginTop: '3px'
                }
            }
        }
        return styles;
    }

    renderCast(cast) {
        const styles = this.inlineStyles().mcard;
        const castUI = cast.map((c, index) => {
            return (
                <div className="col s12 m6 l3" key={index}>
                    <div style={styles.card}>
                        <div className="row valign-wrapper">
                            <div className="col s4" style={styles.image}>
                                <img className="responsive-img circle" src={this.getImageSrc(c.profile_path)} />
                            </div>
                            <div className="col s8">
                                <p style={styles.fname}>{c.name}</p>
                                <p style={styles.f12}>{c.character}</p>
                            </div>
                        </div>
                    </div>
                </div>);
        });
        return castUI;
    }

    renderCrew(crew) {
        const styles = this.inlineStyles().mcard;
        const crewUI = crew.map((c, index) => {
            return (
                <div key={index}>
                    <div className="col s12 m6 l3">
                        <div style={styles.card}>
                            <div className="row valign-wrapper">
                                <div className="col s4" style={styles.image}>
                                    <img className="responsive-img circle" src={this.getImageSrc(c.profile_path)} />
                                </div>
                                <div className="col-s8">
                                    <p style={styles.fname}>{c.name}</p>
                                    <p style={styles.f12}>{c.job}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        index % 4 === 3 ? <div className="hide-on-small-only" style={{clear: 'both'}}></div> : ''
                    }
                </div>);
        });
        return crewUI;
    }

    renderImages(posters) {
        const postersUI = posters.map((poster, index) => {
            return (
                <div className="col s6 m3">
                    <img className="responsive-img materialboxed" src={this.getImageSrc(poster.file_path)} />
                </div>
            );
        });
        return postersUI;
    }

    render() {
        const movie = this.props.moviesData.results[this.props.params.id];
        if (movie) {
            const rating = {
                size: 24,
                count: 10,
                edit: false,
                value: movie.vote_average
            }
            const genres = this.movieGenres(movie.genres);
            const releaseDate = DateUtils.formatDate(movie.release_date);
            var divStyle = {
                backgroundImage: 'url(' + IMAGE_URI_ORIGINAL + movie.backdrop_path + ')'
            }
            return (
                <div> 
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>  
                    <div className="movie card-panel">
                        <div className="row">
                            <div className="col s12 m3">   
                                <img className="responsive-img" src={IMAGE_URI_ORIGINAL + movie.poster_path} />
                                <a className="btn waves-effect modal-trigger waves-light w100" data-target="movie-trailer">
                                Watch Trailer
                                    <i className="fa fa-youtube-play left" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="col s12 m9">
                                <h5 className="right mcolor">
                                    <span className="fa fa-heart-o"></span> &nbsp;
                                    <span className="fa fa-thumbs-o-up"></span>
                                </h5>    
                                <h5>
                                    <a href="http://inceptionmovie.warnerbros.com/" target="_blank">
                                        {movie.title} ({DateUtils.formatDate(movie.release_date, 'YYYY')})
                                    </a>
                                </h5>
                                {movie.genres.map((genre, index) => {
                                    return (<Chip key={index}>{genre.name}</Chip>)
                                })}
                                <p>{movie.overview}</p>
                                <div className="row">
                                    <div className="col s6 m3">
                                        <label>Release Date:</label> {releaseDate}    
                                    </div> 
                                    <div className="col s6 m2">
                                        <label>Play Time:</label> {movie.runtime} min    
                                    </div> 
                                    <div className="col s6 m3">
                                        <label>Language:</label> {languageCodeNames[movie.original_language]}    
                                    </div>
                                </div>
                                <div>
                                    Rating: <ReactStars onChange={this.ratingChanged} {...rating}/>
                                </div>
                                {
                                    movie.keywords.keywords.map((keyword, index) => {
                                        return (<Chip key={index}>{keyword.name}</Chip>)
                                    }) 
                                }
                                <p>Budget: {movie.budget}</p>
                                <p>Revenue: {movie.revenue}</p>
                                
                                <div id="rateYo"></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m9" style={{marginBottom: '10px'}}>
                                <ul className="tabs tabs-fixed-width">
                                    <li className="tab col s3 m3">
                                        <a className="active"  href="#cast">Cast</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#crew">Crew</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#images">Images & Videos</a>
                                    </li>
                                </ul>
                            </div>
                             <div id="cast" className="col s12">
                                <div className="row">
                                    {this.renderCast(movie.credits.cast)}
                                </div>
                            </div>
                            <div id="crew" className="col s12">
                                <div className="row">
                                    {this.renderCrew(movie.credits.crew)}    
                                </div> 
                            </div>
                            <div id="images" className="col s12">
                                <div className="row">
                                    <ul className="collapsible" data-collapsible="accordion">
                                        <li>
                                            <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                                            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                                        </li>
                                        <li>
                                            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                                            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                                        </li>
                                        <li>
                                            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                                            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                                        </li>
                                    </ul>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="movie-trailer" className="modal">
                        <div className="modal-content">
                            <h4>Modal Header</h4>
                            <p>A bunch of text</p>
                        </div>  
                    </div>
                </div>
            )
        }else {
            return (<div></div>);
        }
    }
}

MovieDetailsComponent.propTypes = {
    
};

export default MovieDetailsComponent;