import React, { Component } from 'react';

class PeopleTimeline extends Component {
    render() {
        const timelineData = this.props.timelineDate;
        if (Object.keys(timelineData).length > 1) {
            return(
                <div className="profile-timeline">
                    <ul className='timeline'>
                        {
                            timelineData.years.map((year, index) => {
                                return (
                                    <div key={index}>
                                        <li className="year">{year}</li>
                                        {
                                            timelineData[year].map((item, key) => {
                                                return(
                                                    <li className="event pointer" key={key}
                                                        onClick={() => this.props.goto(item.id)}>
                                                        <span className="movie-title">
                                                            {item.title || item.original_name}
                                                        </span>
                                                        <span>{item.character}</span>
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
        } else {
            return (
                <div style={{ margin: '25px', fontWeight: 800, textAlign: 'center' }}>No Information Found</div>
            )
        }
        
    }
}

export default PeopleTimeline;