import React, {Component, PropTypes} from 'react';
import { OriginalImageUrl, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate, commaSeparateObj } from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';
import numeral from 'numeral';
import Casting from './CastingComponent.jsx';
import Crew from './CrewComponent.jsx';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import Rating from 'react-rating';

class TvDetailsComponent extends Component {
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
        this.props.actions.fetchTv(this.props.params.id).then(() => {
            const serial = this.props.tv.tv_results[this.props.params.id];
            let rating = 0;
            if (serial) {
                rating = serial.vote_average;
            }
            $('#tvRating').rateYo({
                starWidth: '18px',
                halfStar: true,
                precision: 5,
                padding: '5px',
                numStars: 10,
                maxValue: 10
            });
            $('#tvRating').rateYo('rating', rating);
            $('ul.tabs').tabs();
        })
        window.addEventListener('resize', function (event) {
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
        const serial = this.props.tv.tv_results[this.props.params.id];
        if(serial) {
            const firstAirDate = serial.first_air_date ? formatDate(serial.first_air_date) : 'NA';
            const divStyle = {
                backgroundImage: 'url(' + OriginalImageUrl + serial.backdrop_path + ')'
            }
            return (
                <div>
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>
                    <div className="movie card-panel">
                        <div className="row no-bm">
                            <div className="col s12 m3">
                                <img className="responsive-img"
                                     src={OriginalImageUrl + serial.poster_path} />
                                <a className="btn waves-effect waves-light w100"
                                    onClick={this.openDialog}>
                                    Watch Trailer
                                    <i className="fa fa-youtube-play left" aria-hidden="true"/>
                                </a>
                            </div>
                            <div className="col s12 m9">
                                <h5 className="right mcolor">
                                    <span className="fa fa-heart-o pointer"></span> &nbsp;
                                    <span className="fa fa-bookmark-o pointer"></span>
                                </h5>
                                <h5>
                                    <a href={serial.homepage || '#!'} target="_blank">
                                        {serial.name} ({formatDate(serial.first_air_date, 'YYYY')})
                                    </a>
                                </h5>
                                {serial.genres.map((genre, index) => {
                                    return (
                                        <div className="mitem-chip" key={index}>{genre.name}</div>
                                    )
                                })}
                                <p>{serial.overview}</p>
                                <div className="row no-bm">
                                    <div className="col s6 m3">
                                        <p><b>First Air Date</b></p>
                                        <p>{firstAirDate}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Episode Run Time</b></p>
                                        <p>{commaSeparate(serial.episode_run_time, ' min')}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Language</b></p>
                                        <p>{languageCodeNames[serial.original_language]}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Status</b></p>
                                        <p>{serial.in_production ? 'Running': 'Not Running'}</p>
                                    </div>
                                </div>
                                <div className="row no-bm">
                                    <div className="col s6 m3">
                                        <p><b>Sesons Completed</b></p>
                                        <p>{serial.number_of_seasons}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Total Episodes</b></p>
                                        <p>{serial.number_of_episodes}</p>
                                    </div>
                                    <div className="col s6 m3">
                                        <p><b>Last Aired On</b></p>
                                        <p>{formatDate(serial.last_air_date)}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <p><b>Aired On</b></p>
                                        <p>{commaSeparateObj(serial.networks, 'name')}</p>
                                    </div>
                                    <div className="col s12 m6">
                                        <p><b>Rating</b></p>
                                        <Rating empty="fa fa-star-o"
                                            full="fa fa-star" fractions={10} stop={10} 
                                            initialRate={serial.vote_average}
                                            onClick={this.ratingSelected} />
                                        <p className="inline-block no-m"
                                            style={{ paddingLeft: '15px' }}>
                                            <b>({serial.vote_average})</b>
                                        </p>
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block"><b>Seasons:</b></p>  &nbsp;
                                        {
                                            serial.seasons.map((season, index) => {
                                                return (
                                                    <div className="pointer season-number" key={index}>
                                                        {index + 1}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block"><b>Tags:</b></p>  &nbsp;
                                        {
                                            serial.keywords.results.map((keyword, index) => {
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
                            <div className="col s12" style={{marginBottom: '10px'}}>
                                <ul className="tabs tabs-fixed-width">
                                    <li className="tab col s3 m4">
                                        <a className="active"  href="#tv_cast">Cast & Crew</a>
                                    </li>
                                    <li className="tab col s3 m4">
                                        <a href="#tv_similar">Similar & Recommendations</a>
                                    </li>
                                    <li className="tab col s3 m4">
                                        <a href="#tv_images">Image Gallery</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="tv_cast" className="col s12">
                                {
                                    serial.credits.cast.length > 0 || serial.credits.crew.length > 0 ?
                                        (
                                            <div>
                                                <div style={{ padding: '0 25px' }}>
                                                    <Casting cast={serial.credits.cast} id="tvCast" />
                                                </div>
                                                <Crew crew={serial.credits.crew} />
                                            </div>
                                        ) : <div className="center-align">
                                                <p>No Cast & Crew Details Found !!</p></div>
                                }
                            </div>
                            <div id="tv_similar" className="col s12">
                                <h5 className="center-align">Similar Television Serials</h5>
                                <div style={{padding: '0 25px'}}>
                                    <SimilarSerials tvId={serial.id} fetchSimilar={this.props.actions.similarSerials}
                                                   similar={serial.similar} />
                                </div>
                                <h5 className="center-align">Recommended Serials</h5>
                                <div style={{padding: '0 25px'}}>
                                    <RecommendedSerials tvId={serial.id}
                                                       recommendations={serial.recommendations} />
                                </div>
                            </div>
                            <div id="tv_images" className="col s12">
                                <div style={{padding: '0 25px'}}>
                                    <ImageGallery posters={serial.images.posters} backdrops={serial.images.backdrops}/>
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
                                serial.videos.results.length > 0 ? (
                                    <ReactPlayer 
                                        width={this.state.modalClass.content.width}
                                        height={this.state.modalClass.content.height}
                                        url={'https://www.youtube.com/watch?v='+serial.videos.results[0].key} playing 
                                        controls={true}/>
                                ): (
                                   <div style={{backgroundColor: '#fff', padding: '20px'}}> No Trailer To Play !!</div>
                                )
                            }
                            
                        </div>
                    </Modal>
                </div>
            )
        }
        return (<div/>);
    }
}

export default TvDetailsComponent;

class SimilarSerials extends Component {

    componentDidMount() {
        $('#similar_serials').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            adaptiveHeight: true,
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
        $('#similar_serials').on('afterChange', function(slick, c) {
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
        const similarSerials = this.props.similar.results;
        return (
            <div id="similar_serials" >
                {
                    similarSerials.map((serial, index) => {
                        const poster_path = serial.poster_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            src = OriginalImageUrl + poster_path;
                        }
                        return (
                            <div className="col s6 m4 l3" key={index} >
                                <div className="relative">
                                    <img className="responsive-img pointer" data-lazy={src} />
                                    <span className="cast-title">
                                        {serial.title}
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

SimilarSerials.PropTypes = {
    tvId: React.PropTypes.string.isRequired,
    similar: React.PropTypes.object.isRequired,
    fetchSimilar: React.PropTypes.func.isRequired
}

class RecommendedSerials extends Component {

    componentDidMount() {
        $('#recommended_serials').slick({
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
        const recommendedSerials = this.props.recommendations.results;

        return (
            <div id="recommended_serials" >
                {
                    recommendedSerials.map((serial, index) => {
                        const poster_path = serial.poster_path;
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
                                        {serial.title}
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

RecommendedSerials.PropTypes = {
    tvId: React.PropTypes.string.isRequired,
    recommendations: React.PropTypes.object.isRequired
}

class ImageGallery extends Component {

    componentDidMount() {
        $('#tv_image_gallery').slick({
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
        $('#tv_image_gallery').on('afterChange', function(slick, c) {
            if(c.currentSlide >= this.props.backdrops.length) {
                $('#tv_image_gallery').slick('slickSetOption', 'slidesToShow', 3);
                $('#tv_image_gallery').slick('slickSetOption', 'slidesToScroll', 3);
            }else {
                $('#tv_image_gallery').slick('slickSetOption', 'slidesToShow', 1);
                $('#tv_image_gallery').slick('slickSetOption', 'slidesToScroll', 1);
            }
            $('#tv_image_gallery').slick('slickSetOption', 'responsive', [
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
            ])
        }.bind(this))
    }

    render() {
        const images = this.props.backdrops.concat(this.props.posters);
        return (
            <div id="tv_image_gallery" >
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