import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

class SimpleCardComponent extends Component {

    /**
     *Construct Image url
     */
    getImageSrc(path) {
        if (path) {
            return IMAGE_URI_ORIGINAL + path;
        } else {
            return '../../dist/assets/images/placeholder.jpg';
        }
    }

    /**
     *Construct Genres
     */
    getGenres(itemGenres, genres) {
        let genresString = '';
        if (itemGenres && genres) {
            for (let i = 0; i < itemGenres.length; i++) {
                const genreId = itemGenres[i];
                if (genres && genres[genreId]) {
                    genresString = genresString + genres[genreId].name;
                    if (i !== itemGenres.length - 1) {
                        genresString = genresString + ', ';
                    }
                }
            }
        }
        return genresString;
    }

    render() {
        const item = this.props.item;
        const genresString = this.getGenres(item.genre_ids, this.props.genres);
        return (
            <div className="card ccard">
                <div className="card-image">
                    <img onClick={() => { this.props.gotoItem(item.id) } }
                        src={this.getImageSrc(item.image_path)} className="pointer" />
                </div>
                <div className="card-content">
                    <span className="activator">
                        {item.title}
                        <i style={{ cursor: 'pointer' }}className="material-icons right">more_vert</i>
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
                        <span className="right"><i className="fa fa-calendar"></i> {item.date}</span>
                    </div>  
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4"><i>{item.title}</i>
                        <i className="material-icons right">close</i>
                    </span>
                    <p>Genres: {genresString}</p>
                    <p>{item.overview}</p>
                </div>
            </div>
        );
    }
}

SimpleCardComponent.propTypes = {
    item: React.PropTypes.object.isRequired,
    gotoItem: React.PropTypes.func.isRequired
};

export default SimpleCardComponent;