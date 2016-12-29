import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../utilities/AppConstants';
import {createDate} from '../utilities/AppUtils';

class SimpleCardComponent extends Component {

    constructor(props) {
        super(props);
        this.addToWatchList = this.addToWatchList.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        
    }

    componentDidMount () {
        lazy.init();
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

    inlineStyles() {
        return {
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

    // todo: decide boolean based on profile watchlist
    addToWatchList(id) {
        this.props.saveWatchlist(id, true);
    }

    // todo: decide boolean based on profile watchlist
    addToFavorites(id) {
        this.props.saveFav(id, true);
    }

    // todo: This is for hover remove based on implementation
    jQueryImplementations(item) {
        $('#card-top-'+item.id).hide();
        $('#card-image-'+item.id).hover(() => {
            $('#card-top-'+item.id).fadeIn(400);
        }, () => {
        $('#card-top-'+item.id).fadeOut(400);
        });
    }

    render() {
        const item = this.props.item;
        const styles = this.inlineStyles();
        const date = createDate(item.date);
        return (
            <div className="card ccard">
                <div className="card-image" id={"card-image-"+item.id}>
                    <img onClick={() => { this.props.gotoItem(item.id) } }
                        src="../../dist/assets/images/placeholder.jpg"
                        data-lazy={this.getImageSrc(item.image_path)}
                        className="pointer" id={"image-"+item.id}/>
                    <div className="card-bookmark-fav" id={"card-top-"+item.id}>
                        <span>
                            <i className="fa fa-bookmark-o pointer"
                                onClick={() => this.addToWatchList(item.id)}>
                            </i> 
                            &nbsp;
                            <i className="fa fa-heart-o pointer"
                                onClick={() => this.addToFavorites(item.id)}>
                            </i>
                        </span>
                    </div>
                    <div className="ccard-title">
                        {item.title}
                        <span className="right">{item.vote_average + '/10'}</span>
                    </div>
                    <div className="card-date">
                        <span className="day">{date.format('DD')}</span>
                        <span className="month">{date.format('MMM')}</span>
                        <span className="year">{date.year()}</span>
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