import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import Rating from 'react-rating';

import Casting from './CastingComponent.jsx';
import Crew from './CrewComponent.jsx';
import TvGallery from './SimilarOrRecommenedComponent.jsx';
import ItemImageGallery from './ItemImageGallery.jsx';
import VideoModal from './VideoModalComponent.jsx';
import ItemLabel from './ItemLabelComponent.jsx';

import { OriginalImageUrl, H632ImageUrl, W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate, commaSeparateObj } from '../utilities/AppUtils';
import { languageCodeNames } from '../../dist/assets/data/language-countries';

class TvDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        }
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.goBack = this.goBack.bind(this);
        this.ratingSelected = this.ratingSelected.bind(this);
        this.gotoTv = this.gotoTv.bind(this);
        this.gotoCast = this.gotoCast.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchTv(this.props.params.id).then(() => {
            $('ul.tabs').tabs();
        })
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

    ratingSelected(rating, event) {
        this.props.actions.rateTv(this.props.params.id, rating);
    }

    goBack() {
        this.context.router.goBack();
    }

    gotoTv(id) {
        this.context.router.push(`/tv/${id}`);
    }

    gotoCast(id) {
        this.context.router.push(`/people/${id}`);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            this.props.actions.fetchTv(nextProps.params.id);
        }
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
                    <div className="back-button hide-on-small-only">
                        <i className="fa fa-long-arrow-left fa-2x pointer" onClick={this.goBack}/> 
                        <p>Go Back</p>
                    </div>
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
                                    <ItemLabel className="col s6 m3"
                                        label="First Air Date" value={firstAirDate} />
                                    <ItemLabel className="col s6 m3"
                                        label="Episode Run Time"
                                        value={commaSeparate(serial.episode_run_time, ' min')} />
                                    <ItemLabel className="col s6 m3"
                                        label="Language"
                                        value={languageCodeNames[serial.original_language]} />
                                    <ItemLabel className="col s6 m3"
                                        label="Status"
                                        value={serial.in_production ? 'Running' : 'Not Running'} />
                                </div>
                                <div className="row no-bm">
                                    <ItemLabel className="col s6 m3"
                                        label="Sesons Completed" value={serial.number_of_seasons} />
                                    <ItemLabel className="col s6 m3"
                                        label="Total Episodes" value={serial.number_of_episodes} />
                                    <ItemLabel className="col s6 m3"
                                        label="Last Aired On" value={formatDate(serial.last_air_date)} />
                                </div>
                                <div className="row">
                                    <ItemLabel className="col s12 m6"
                                        label="Aired On"
                                        value={commaSeparateObj(serial.networks, 'name')} />
                                    <div className="col s12 m6">
                                        <p><b>Rating</b></p>
                                        <Rating empty="fa fa-star-o"
                                            full="fa fa-star" fractions={2} stop={10} 
                                            initialRate={serial.vote_average}
                                            onClick={this.ratingSelected}
                                            readonly={this.props.app.userInfo.authenticationFailed}/>
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
                                <ul className="tabs tabs-fixed-width tab-color">
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
                                                    <Casting cast={serial.credits.cast}
                                                        goto={this.gotoCast} id="tvCast" />
                                                </div>
                                                <Crew crew={serial.credits.crew} goto={this.gotoCast}/>
                                            </div>
                                        ) : <div className="center-align">
                                                <p>No Cast & Crew Details Found !!</p></div>
                                }
                            </div>
                            <div id="tv_similar" className="col s12">
                                <h5 className="center-align">Similar Television Serials</h5>
                                {
                                    serial.similar.results.length > 0 ? (
                                        <div style={{ padding: '0 25px' }}>
                                            <TvGallery id={serial.id}
                                                goto={this.gotoTv}    
                                                fetchMore={this.props.actions.similarSerials} nameKey="name"
                                                gallery={serial.similar} title="Similar Serials"/> 
                                        </div>
                                    ): <p>No Similar Television Serials Found !</p>
                                }
                                <h5 className="center-align">Recommended Serials</h5>
                                {
                                    serial.recommendations.results.length > 0 ? (
                                        <div style={{ padding: '0 25px' }}>
                                            <TvGallery id={serial.id}
                                                goto={this.gotoTv}    
                                                fetchMore={this.props.actions.recommendedSerials} nameKey="name"
                                                gallery={serial.recommendations} title="Recommended Serials"/>
                                        </div>
                                    ):<p className="center-align">No Recommendations Found !</p>
                                }
                                
                            </div>
                            <div id="tv_images" className="col s12">
                                {
                                    (serial.images.posters.length > 0
                                        || serial.images.backdrops.length > 0) ? 
                                        (
                                            <div style={{ padding: '0 25px' }}>
                                                <ItemImageGallery posters={serial.images.posters}
                                                    backdrops={serial.images.backdrops} />
                                            </div>
                                        ): (<div className="center-align">No Results Found !</div>)
                                }
                            </div>
                        </div>
                    </div>
                    <VideoModal isOpen={this.state.openDialog} closeDialog={this.closeDialog}
                        video={serial.videos.results[0] || {}} />
                </div>
            )
        }
        return (<div/>);
    }
}

TvDetailsComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default TvDetailsComponent;