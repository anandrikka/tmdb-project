import React, {Component, PropTypes} from 'react';
import { OriginalImageUrl, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate, commaSeparateObj } from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';
import numeral from 'numeral';

class TvDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    }

    componentDidUpdate() {

    }

    render() {
        const serial = this.props.tv.tv_results[this.props.params.id];
        if(serial) {
            const firstAirDate = serial.first_air_date ? formatDate(serial.first_air_date) : '';
            const divStyle = {
                backgroundImage: 'url(' + OriginalImageUrl + serial.backdrop_path + ')'
            }
            return (
                <div>
                    <div className="parallax" style={divStyle}></div>
                    <div className="movie-overlay"></div>
                    <div className="movie card-panel">
                        <div className="row">
                            <div className="col s12 m3">
                                <img className="responsive-img"
                                     src={OriginalImageUrl + serial.poster_path} />
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
                                <div className="row">
                                    <TvLabel className="col s12 l4"
                                                name="First Air Date:" value={firstAirDate} />
                                    <TvLabel className="col s12 l4"
                                                name="Episode Run Time:" value={commaSeparate(serial.episode_run_time, ' min')}/>
                                    <TvLabel className="col s12 l4"
                                                name="Language:" value={languageCodeNames[serial.original_language]} />
                                </div>
                                <div className="row">
                                    <TvLabel className="col s12 l3"
                                             name="Seasons Finished:" value={serial.number_of_seasons} />
                                    <TvLabel className="col s12 l3"
                                             name="Total Episodes:" value={serial.number_of_episodes} />
                                    <TvLabel className="col s12 l3"
                                             name="Currently Running Season:"
                                             value={serial.seasons.length > serial.number_of_seasons
                                             ? serial.seasons.length: 'NA'} />
                                    <TvLabel className="col s12 l3"
                                             name="Last Aired On:" value={formatDate(serial.last_air_date)}></TvLabel>
                                </div>
                                <div className="row">
                                    <TvLabel className="col s12"
                                             name="Aired On:" value={commaSeparateObj(serial.networks, 'name')}/>
                                </div>
                                <div className="row">
                                    <div className="valign-wrapper">
                                        <TvLabel className="col s1" name="Rating:" />
                                        <div className="col s11">
                                            <span className="inline-block" id="tvRating" />
                                            <span> ({serial.vote_average})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block">Seasons:</p>  &nbsp;
                                        {
                                            serial.seasons.map((season, index) => {
                                                return (
                                                    <div className="pointer season-number" key={index}>
                                                        {index}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <p className="no-p inline-block">Tags:</p>  &nbsp;
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
                                <h5 className="center-align">CAST</h5>
                                <div style={{padding: '0 25px'}}>
                                    <Casting cast={serial.credits.cast} />
                                </div>
                                <h5 className="center-align">CREW MEMBERS</h5>
                                <CrewMembers crew={serial.credits.crew} />
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
                </div>
            )
        }
        return (<div/>);
    }
}

export default TvDetailsComponent;

class TvLabel extends Component {
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
        $('#tvCastSlick').slick({
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
            <div id="tvCastSlick" >
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
                            <div className="col s12 m6 l4" key={index}>
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

class SimilarSerials extends Component {

    componentDidMount() {
        $('#similar_serials').slick({
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