import React, { Component } from 'react';
import { formatDate } from '../utilities/AppUtils';

class PeoplePersonalInfo extends Component {
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

export default PeoplePersonalInfo;