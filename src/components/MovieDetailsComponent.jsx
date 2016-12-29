import React, {Component, PropTypes} from 'react';
import { IMAGE_URI_ORIGINAL, IMAGE_URI_500W, W300ImageUrl, H632ImageUrl, W45ImageUrl } from '../utilities/AppConstants';
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
        $('.collapsible').collapsible();
        const movie = this.props.movies.results[this.props.params.id];
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
        const movie = this.props.movies.results[this.props.params.id];
        if (movie) {
            const releaseDate = formatDate(movie.release_date);
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
                                        value={movie.budget ? numeral(movie.budget).format('$ 0,0') : 'NA'}/>
                                   <MovieLabel className="col s6 m3"
                                        name="Revenue: "
                                        value={movie.revenue ? numeral(movie.revenue).format('$ 0,0') : 'NA'}/>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block">Tags:</p>  &nbsp;   
                                        {
                                            movie.keywords.keywords.map((keyword, index) => {
                                                return (
                                                    <ChipInfo id={keyword.id} key={index}
                                                        name={keyword.name}
                                                        selected={this.keywordSelected}/>
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
                                        <a className="active"  href="#cast">Cast & Crew</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#crew">Crew</a>
                                    </li>
                                    <li className="tab col s3 m3">
                                        <a href="#images">Pictures & Videos</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="cast" className="col s12">
                                <h5 style={{paddingLeft:'0.75rem'}}>Cast</h5>    
                                <Casting cast={movie.credits.cast} />
                                <h5 style={{paddingLeft:'0.75rem'}}>Crew Members</h5>
                                <CrewMembers crew={movie.credits.crew} />
                            </div> 
                             <div id="crew" className="col s12">   
                                 
                            </div>
                            <div id="images" className="col s12">

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
            <div className="chip">
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
            slidesToShow: 6,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        });
    }
    inlineStyles() {
        const styles = {
            castTitle: {
                position: 'absolute',
                zIndex: 2,
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '0.6em',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '500',
                textAlign: 'center',
                display: 'block',
                background: 'rgba(0, 0, 0, 0.3)',
            }
        }
        return styles;
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
                            <div className="col s6 m3 l2" key={index} >
                                <div className="relative">
                                    <img className="responsive-img pointer"
                                        key={index} data-lazy={src} />
                                    <span style={this.inlineStyles().castTitle}>
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
                Object.keys(crew).map((cItem, index) => {
                    return (
                    <div className="col s12 m6 l4" key={index}>
                        <div>
                            <h6><strong>{cItem}</strong></h6>
                            <ul className="collection crew-collection">
                            {
                            crew[cItem].map((cMember, index) => {
                                const profile_path = cMember.profile_path;
                                let src = '../../dist/assets/images/placeholder-profile.jpg'; 
                                if (profile_path && profile_path !== null && profile_path.length > 0) {
                                    src = W300ImageUrl + cMember.profile_path;
                                }
                                return (
                                <li className="collection-item avatar" key={index}>
                                    <img src={src} alt="" className="circle"/>
                                    <span className="title">{cMember.name}</span>
                                    <p>{cMember.job}</p>
                                </li>
                                )
                            })
                            }
                            </ul>                                            
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
