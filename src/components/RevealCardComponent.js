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
            return '../../dist/assets/images/placeholder.png';
            //return 'http://placehold.it/500x500';
        }
    }

    render() {
        let item = this.props.item;
        console.log('CardComponent', this.props);
        let genres='';
        for (let i = 0; i < item.genre_ids.length; i++) {
            if (this.props.genres[item.genre_ids[i]]) {
                genres = genres + this.props.genres[item.genre_ids[i]].name;
            }
            if (i !== item.genre_ids.length - 1) {
                genres = genres + ', ';
            }
        }
        return (
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={this.getImageSrc(item.backdrop_path)} />
                </div>
                <div className="card-content ccard-content">
                    <span className="activator ccard">
                        {item.original_title}<i style={{cursor:'pointer'}} className="material-icons right">more_vert</i>
                    </span>
                    <p><span className="text-darken-4">Genres: </span>{genres}</p>
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