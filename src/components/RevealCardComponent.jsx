import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

class RevealCardComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    
    getImageSrc(path) {
        if (path) {
            return IMAGE_URI_ORIGINAL + path;
        } else {
            return '../../dist/assets/images/placeholder.jpg';
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
            <div className="card ccard">
                <div className="card-image ">
                    <img src={this.getImageSrc(item.backdrop_path || item.profile_path)} />
                </div>
                <div className="card-content">
                    <span className="activator">
                        {item.original_title || item.original_name}<i style={{ cursor: 'pointer' }} className="material-icons right">more_vert</i>
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
						<span className="right"><i className="fa fa-calendar"> 10-Nov-2016</i></span>
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