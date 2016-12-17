import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

class SimpleCardComponent extends Component {

    componentDidMount () {
        $('.card-top').hide();
        $('.card-image').hover(function() {
            $('.card-top').fadeIn(400);
        }, function() {
            $('.card-top').fadeOut(400);
        });
    }
    

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

    inlineStyles() {
        return {
            cardBottom: {
                position: 'absolute',
                zIndex: 2,
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '8px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                background: 'rgba(0, 0, 0, 0.3)'
            },
            toggleBookmarkFav: {
                position: 'absolute',
                zIndex: 2,
                top: 0,
                right: 0,
                padding: '5px',
                fontSize: '20px',
                color: 'white',
            },
            iconBackground: {
                 background: 'rgba(0, 0, 0, 0.3)'
            }
        }
    }

    render() {
        const item = this.props.item;
        const genresString = this.getGenres(item.genre_ids, this.props.genres);
        const styles = this.inlineStyles();
        return (
            <div className="card ccard">
                <div className="card-image c2">
                    <img onClick={() => { this.props.gotoItem(item.id) } }
                        src={this.getImageSrc(item.image_path)} className="pointer" />
                    <div style={styles.toggleBookmarkFav} id="card-top">
                        <span>
                            <i className="fa fa-bookmark-o pointer"></i> &nbsp;
                            <i className="fa fa-heart-o pointer"></i>
                        </span>
                    </div>
                    <div style={styles.cardBottom}>
                        {item.title}
                    </div>
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