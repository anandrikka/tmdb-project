import React, { Component } from 'react';
import moment from 'moment'; // eslint-disable-line
import { OriginalImageUrl } from '../utilities/AppConstants';
import { formatDate } from '../utilities/AppUtils';
import PeopleTimeline from './PeopleTimelineComponent.jsx';
import PeopleGallery from './PeopleGalleryComponent.jsx';
import PeoplePersonalInfo from './PeoplePersonalInfoComponent.jsx';

class PeopleDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesTimelineBtnClass: 'btn pointer',
            tvTimelineBtnClass: 'btn disabled pointer',
            showMovieTimeline: true
        }
        this.movieBtnClicked = this.movieBtnClicked.bind(this);
        this.tvBtnClicked = this.tvBtnClicked.bind(this);
        this.afterChange = this.afterChange.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
        this.gotoTv = this.gotoTv.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchPeopleDetails(this.props.params.id).then(() => {
            $('ul.tabs').tabs();
        });
    }

    findBackdropImage(list) {
        let backdrop = null;
        for(let i=0; i< list.length; i++) {
            if(list[i].image_type === 'backdrop') {
                backdrop = list[i].file_path;
                break;
            }
        }
        return backdrop;
    }

    formatDataForTimeline(items) {
        let timelineData = {};
        for(let i=0; i<items.length; i++) {
            const item = items[i];
            const year = formatDate(item.release_date || item.first_air_date, 'YYYY');
            if(timelineData[year]) {
                timelineData[year].push(item);
            }else{
                timelineData[year] = [];
                timelineData[year].push(item);
            }
        }
        const years = Object.keys(timelineData);
        years.sort(function(m1, m2){
            if(m1 < m2) {
                return 1;
            }
            return -1;
        });
        timelineData.years = years;
        return timelineData;
    }

    movieBtnClicked() {
        this.setState({
            moviesTimelineBtnClass: 'btn pointer',
            tvTimelineBtnClass: 'btn disabled pointer',
            showMovieTimeline: true
        });
    }

    tvBtnClicked() {
        this.setState({
            moviesTimelineBtnClass: 'btn disabled pointer',
            tvTimelineBtnClass: 'btn pointer',
            showMovieTimeline: false
        });
    }

    afterChange(slideIndex) {
        const profile = this.props.people.people_results[this.props.params.id];
        const taggedImages = profile.tagged_images && profile.tagged_images.results || [];
        const totalItems = profile.images.profiles.length + taggedImages.length;
        const page = profile.tagged_images && profile.tagged_images.page || 1;
        const totalPages = profile.tagged_images && profile.tagged_images.total_pages || 1;
        if (slideIndex > (totalItems - 10)) {
            if (page < totalPages) {
                this.props.actions.fetchTaggedImages(this.props.params.id, page + 1);
            }    
        }
    } 

    gotoMovie(id) {
        this.context.router.push(`/movies/${id}`);
    }

    gotoTv(id) {
        this.context.router.push(`/tv/${id}`);
    }

    goBack() {
        this.context.router.goBack();
    }    

    render() {
        const profile = this.props.people.people_results[this.props.params.id];
        if(profile) {
            const movieTimelineData = this.formatDataForTimeline(profile.movie_credits.cast);
            const tvTimelineData = this.formatDataForTimeline(profile.tv_credits.cast);
            const taggedImages = profile.tagged_images && profile.tagged_images.results || [];
            let backdrop = this.findBackdropImage(taggedImages);
            if(backdrop) {
                backdrop = OriginalImageUrl + backdrop;
            }else {
                backdrop =  '../../dist/assets/images/placeholder-backdrop.jpg';
            }
            let profilePath = profile.profile_path;
            if(!profilePath) {
                profilePath = '../../dist/assets/images/placeholder-profile.jpg'
            }else {
                profilePath = OriginalImageUrl + profilePath;
            }
            const divStyle = {
                background: 'url(' + backdrop + ')'
            }

            return (
                <div>
                    <div className="profile-parallax parallax" style={divStyle} />
                    <div className="profile-overlay"></div>
                    <div className="back-button hide-on-small-only">
                        <i className="fa fa-long-arrow-left fa-2x pointer" onClick={this.goBack}/> 
                        <p>Go Back</p>
                    </div>
                    <div className="profile row">
                        <div className="col s12 m12 l3">
                            <div className="card">
                                <div className="card-image pointer">
                                    <img className="responsive-img" src={profilePath} />
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l9">
                            <h2>{profile.name}</h2>
                            <p className="biography-ellipses">{profile.biography}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 l3 personal-info">
                            <PeoplePersonalInfo profile={profile}/>
                        </div>
                        <div className="col s12 l9">
                            <div className="row">
                                <div className="col s12">
                                    <ul className="people-tabs tabs tabs-fixed-width">
                                        <li className="tab col s6">
                                            <a className="active" href="#people_timeline">
                                                <span className="hide-on-small-only">Timeline</span>
                                                <i className="fa fa-clock-o hide-on-med-and-up"></i>
                                            </a>
                                        </li>
                                        <li className="tab col s6">
                                            <a href="#people_gallery">
                                                <span className="hide-on-small-only">Gallery</span>
                                                <i className="fa fa-picture-o hide-on-med-and-up"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div id="people_timeline" className="col s12">
                                    <div style={{margin: '10px', float:'right'}}>
                                        <button className={this.state.moviesTimelineBtnClass} onClick={this.movieBtnClicked}>
                                           <i className="fa fa-film"></i>
                                        </button>
                                        <button className={this.state.tvTimelineBtnClass} onClick={this.tvBtnClicked}>
                                            <i className="fa fa-television"></i>
                                        </button>
                                    </div>
                                    <div className="clearfix"/>
                                    {
                                        this.state.showMovieTimeline ? 
                                            <PeopleTimeline
                                                goto= {this.gotoMovie}    
                                                timelineDate={movieTimelineData} />:
                                            <PeopleTimeline
                                                goto= {this.gotoTv}     
                                                timelineDate={tvTimelineData} />
                                    }
                                </div>
                                <div id="people_gallery" className="col s12">
                                    <div style={{ padding: '25px' }}>
                                        {
                                            (profile.images.profiles.length > 0
                                                || taggedImages.length > 0) ?
                                                (
                                                  <PeopleGallery taggedImages={taggedImages}
                                                    profileImages={profile.images.profiles}
                                                    afterChange={this.afterChange}/>  
                                                ) : (
                                                    <div className="center-align">No Results Found</div>
                                                )
                                        }    
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (<div></div>);
    }
}

PeopleDetailsComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default PeopleDetailsComponent;


