import React, { Component, PropTypes } from 'react';
import LazyLoad from 'react-lazyload';
import { OriginalImageUrl } from '../utilities/AppConstants';
import {createDate} from '../utilities/AppUtils';

class SimpleCardComponent extends Component {

    constructor(props) {
        super(props);
        this.addToWatchList = this.addToWatchList.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    componentDidMount () {
        //lazy.init();
    }
    
    /**
     *Construct Image url
     */
    getImageSrc(path) {
        if (path) {
            return OriginalImageUrl + path;
        } else {
            return '../../dist/assets/images/placeholder-min.jpg';
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

    render() {
        const item = this.props.item;
        const styles = this.inlineStyles();
        const date = createDate(item.date);
        return (
            <div className="card ccard">
                <div className="card-image" id={"card-image-"+item.id}>
                    <LazyLoad height={240}>
                        <div>
                            <img onClick={() => { this.props.gotoItem(item.id) } }
                            src={this.getImageSrc(item.image_path)}
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
                    </LazyLoad>
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

class PlaceHolderComponent extends Component {
    render() {
        return (
            <div className="card ccard">
                <div className="card-image">
                    <img src="../../dist/assets/images/placeholder-min.jpg"/>
                </div>
            </div>
        )
    }
}