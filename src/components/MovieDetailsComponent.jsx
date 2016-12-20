import React, {Component, PropTypes} from 'react';
import data from './sample-data';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

class MovieDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        const id = this.props.params.id;
        if (id  && this.props.moviesData.results && nextProps.moviesData.results[id]) {
            return true;
        }
        return false;
    }
    

    render() {
        const movieDetails = data;
        let divBackground = {
            background: 'linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.9)), url('+ IMAGE_URI_ORIGINAL + movieDetails.backdrop_path + ') no-repeat center center fixed',
            backgroundSize: 'cover',
            height: '1000px',
            padding: '50px',
            color: '#fff'
        };

        let poster = {
            height: '450px',
            width: '300px'
        };

        let cast = {
            height: '50px',
            width: '50px',
            borderRadius: '50%'
        };

        console.log(JSON.stringify(this.props.moviesData.results[this.props.params.id]));

        return (

            <div style={ divBackground }>
                <div className="row">
                    <div  className="col s3"><img src={ IMAGE_URI_ORIGINAL + movieDetails.poster_path } style={ poster } /></div>
                    <div className="col s8 offset-s1">
                        <div className="row">
                            <h3>{ movieDetails.title }</h3>
                            <h5 className="grey-text">
                            <span className="col s2">
                                <i className="fa fa-calendar"></i>  { movieDetails.release_date.slice(0,4) }</span>
                            <span className="col s2">
                                <i className="fa fa-star"></i>  {movieDetails.vote_average}</span>
                            </h5>
                        </div>
                        <div className="row">
                            <span style={{fontSize:'22px'}}>
                                <b>Genre -</b> {
                                movieDetails.genres.map(function(genre,index) {
                                    if(index === movieDetails.genres.length-1) {
                                        return <span className="grey-text" style={{ fontSize:'18px' }}>{genre.name}</span>
                                    }
                                    else {
                                        return <span className="grey-text" style={{ fontSize:'18px' }}>{genre.name}, </span>
                                    }
                                })
                            }
                            </span>
                        </div>
                        <div className="row">
                            <span style={{fontSize:'22px'}}>
                                <b>Overview</b><br />
                                <span className="grey-text" style={{ fontSize:'18px' }}>{ movieDetails.overview }</span>
                            </span>
                        </div>
                        <div className="row">
                            <span style={{fontSize:'22px'}}>
                                <b>Main Cast</b>
                            </span>
                            <br />
                            <br />
                            {
                                movieDetails.credits.cast.map(function(cast, index) {
                                    if(index < 4) {
                                        return (
                                            <div className="col s3 center-align grey-text" style={{ fontSize:'18px' }}>
                                                <img src={ IMAGE_URI_ORIGINAL + cast.profile_path } style={{ height:'130px', width:'130px', border: '2px solid white', borderRadius: '50%'}} />
                                                <br />
                                                {cast.name}
                                                <br />
                                                <small>{cast.character}</small>
                                            </div>
                                        )
                                    }
                                })
                            }

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

MovieDetailsComponent.propTypes = {
    
}

export default MovieDetailsComponent;