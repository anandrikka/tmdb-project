import React, { Component, PropTypes } from 'react'

class SimpleCardComponent extends Component {
    render() {
        return (
            <div>
                <div className="card ccard">
                    <div className="card-image ">
                        <img src={this.getImageSrc(data.image)} />
                    </div>
                    <div className="card-content">
                        <span className="activator">
                            {data.title}<i style={{ cursor: 'pointer' }} className="material-icons right">more_vert</i>
                        </span>
                        <div className="row2">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-o"></i>
                            <i className="fa fa-star-o"></i>
                            <span className="right"><i className="fa fa-calendar">10-Nov-2016</i></span>
                        </div>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Overview
                        <i className="material-icons right">close</i>
                        </span>
                        <p>{data.overview}</p>
                    </div>
                </div>
            </div>
        )
    }
}

SimpleCardComponent.propTypes = {
    data: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
}

export default SimpleCardComponent;

/**
 * image, title, overview, genre_ids, rating, release date
 */