import React, { Component } from 'react';
import moment from 'moment'; // eslint-disable-line
import { OriginalImageUrl } from '../utilities/AppConstants';
import { formatDate } from '../utilities/AppUtils';

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
                backdrop =  '../../dist/assets/images/placeholder.jpg';
            }
            let profilePath = profile.profile_path;
            if(!profilePath) {
                profilePath = '../../dist/assets/images/placeholder-profile.jpg'
            }
            const divStyle = {
                background: 'url(' + backdrop + ')'
            }

            return (
                <div>
                    <div className="profile-parallax parallax" style={divStyle} />
                    <div className="profile-overlay"></div>
                    <div className="profile row">
                        <div className="col s12 m12 l3">
                            <div className="card">
                                <div className="card-image pointer">
                                    <img className="responsive-img" src={OriginalImageUrl + profile.profile_path} />
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
                            <Profile profile={profile}/>
                        </div>
                        <div className="col s12 l9">
                            <div className="row">
                                <div className="col s12">
                                    <ul className="people-tabs tabs tabs-fixed-width">
                                        <li className="tab col s6">
                                            <a className="active"  href="#people_timeline">Timeline</a>
                                        </li>
                                        <li className="tab col s6">
                                            <a href="#people_gallery">Gallery</a>
                                        </li>
                                    </ul>
                                </div>
                                <div id="people_timeline" className="col s12">
                                    <div style={{margin: '10px', float:'right'}}>
                                        <button className={this.state.moviesTimelineBtnClass} onClick={this.movieBtnClicked}>
                                            MOVIES
                                        </button>
                                        <button className={this.state.tvTimelineBtnClass} onClick={this.tvBtnClicked}>
                                            TV
                                        </button>
                                    </div>
                                    <div className="clearfix"/>
                                    {
                                        this.state.showMovieTimeline && (
                                            <div className="profile-timeline">
                                                <ul className='timeline'>
                                                    {
                                                        movieTimelineData.years.map((year, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <li className="year">{year}</li>
                                                                    {
                                                                        movieTimelineData[year].map((movie, key) => {
                                                                            return(
                                                                                <li className="event pointer" key={key}>
                                                                                    <span className="movie-title">{movie.title}</span>
                                                                                    <span>{movie.character}</span>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                    {
                                        !this.state.showMovieTimeline && (
                                            <div className="profile-timeline">
                                                <ul className='timeline'>
                                                    {
                                                        tvTimelineData.years.map((year, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <li className="year">{year}</li>
                                                                    {
                                                                        tvTimelineData[year].map((tv, key) => {
                                                                            return(
                                                                                <li className="event pointer" key={key}>
                                                                                    <span className="movie-title">{tv.original_name}</span>
                                                                                    <span>{tv.character}</span>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                                <div id="people_gallery" className="col s12">
                                    <div style={{padding: '25px'}}>
                                        <ProfileGallery profileImages={profile.images.profiles}></ProfileGallery>
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


export default PeopleDetailsComponent;

class Profile extends Component {
    render() {
        const profile = this.props.profile;
        return (
            <div>
                <h5>Personal Info</h5>
                <p>Gender</p>
                <span>{profile.gender===1 ? 'Female' : 'Male'}</span>
                <p>Date of Birth</p>
                <span>{ profile.birthday ? formatDate(profile.birthday) : 'Not Known'}</span>
                <p>Place Of Birth</p>
                <span>{ profile.place_of_birth ? profile.place_of_birth: 'Not Known'}</span>
                {
                    profile.also_known_as.length > 0 && (
                        <div>
                            <p>Also Known as</p>
                            {
                                profile.also_known_as.map((item, index) => {
                                    return (<span style={{display:'block'}} key={index}>{item}</span>)
                                })
                            }
                        </div>
                    )
                }
                <p>Adult Actor</p>
                <span>{profile.adult ? 'Yes': 'No'}</span>
                <p>Total Known Credits</p>
                <span>
                    {
                        profile.movie_credits.cast.length + profile.movie_credits.crew.length +
                            profile.tv_credits.cast.length + profile.tv_credits.crew.length
                    }
                </span>
            </div>
        )
    }
}

class ProfileGallery extends Component {

    componentDidMount() {
        $('#profileImagesSlick').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 2,
                        slidesToScroll: 2,
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
    }

    render() {
        return (
            <div id="profileImagesSlick" >
                {
                    this.props.profileImages.map((profileImage, index) => {
                        let filePath = profileImage.file_path;
                        if(filePath) {
                            filePath = OriginalImageUrl + filePath;
                            return (
                                <div key={index} className="col s12 m2 l4">
                                    <img className="responsive-img" data-lazy={filePath} />
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}