import React, {Component, PropTypes} from 'react';
import { W154ImageUrl } from '../utilities/AppConstants';
import { formatDate, commaSeparate } from '../utilities/AppUtils';

class ProfileItem extends Component {

    render() {
        const item = this.props.item;
        const imageTag = this.imageTag(item);
        const genres = this.genres(item.genre_ids, this.props.genres)
        return (
            <div className="col s12 m6 l3">
                <div className="card horizontal profile-card">
                    <div className="card-image">
                        {imageTag}
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <p className="title ellip">
                                {item.title || item.name} ({formatDate(item.release_date || item.first_air_date, 'YYYY')})
                            </p>
                            <p className="ellip">{genres}</p>
                            <p><b>Rating: </b>{item.vote_average}</p>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }

    imageTag(item) {
        const poster_path = item.poster_path;
        let imageTag;
        if(poster_path && poster_path !== null) {
            const src = W154ImageUrl + poster_path;
            imageTag = <img src={src} className="responsive-img"/>
        }else {
            let name = '';
            const title = item.title || item.name;
            let nameSplit = title.split(' ');
            if(nameSplit.length > 0) {
                nameSplit.forEach(function(n){
                    name = name + n.substr(0, 1);
                })
            }else {
                name = title.substr(0, 2);
            }
            imageTag = (<div className="responsive-img valign-wrapper"><h5 className="valign">{name}</h5></div>);
        }
        return imageTag;
    }

    genres(list, map) {
        let genres = '';
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (map[list[i]] && map[list[i]].name) {
                    genres += map[list[i]].name
                }
                if (i < list.length - 1) {
                    genres += ', '
                }
            }
        }
        return genres;
    }    

}

ProfileItem.propTypes = {

};

export default ProfileItem;