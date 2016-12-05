import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';

class RevealCardComponent extends Component {

    constructor(props) {
        super(props);
    }

    getImageSrc(path) {
        if (path) {
            return IMAGE_URI_ORIGINAL + path;
        } else {
            return '../../dist/assets/images/placeholder.jpg';
            //return 'http://placehold.it/500x500';
        }
    }

    render() {
        let item = this.props.item;
        let genres = '';
        if (item.genre_ids) {
            for (let i = 0; i < item.genre_ids.length; i++) {
                if (this.props.genres[item.genre_ids[i]]) {
                    genres = genres + this.props.genres[item.genre_ids[i]].name;
                }
                if (i !== item.genre_ids.length - 1) {
                    genres = genres + ', ';
                }
            }
        }

        return (
            <div className="card c-card">
                <div className="card-image ">
                    <img className="activator" src={this.getImageSrc(item.backdrop_path || item.profile_path)} />
                    <span className="card-title">{item.original_title || item.original_name}</span>

                </div>
                <div className="card-content ccard-content">
                    <span className="activator ccard">
                        {item.original_title || item.original_name}<i style={{ cursor: 'pointer' }} className="material-icons right">more_vert</i>
                    </span>
                    <div className="valign-wrapper">
                        <p className="valign">
                            <span className="material-icons">date_range</span>{item.release_date}
                        </p>
                    </div>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">Overview
                        <i className="material-icons right">close</i>
                    </span>
                    <p>{item.overview}</p>
                </div>
            </div>
        );
    }
}

RevealCardComponent.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default RevealCardComponent;