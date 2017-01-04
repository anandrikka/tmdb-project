import React, { Component } from 'react';
import { OriginalImageUrl } from '../utilities/AppConstants';
import LazyLoad from 'react-lazyload';

class PeopleCardComponent extends Component {
    render() {
        const item = this.props.item;
        let src = '../../dist/assets/images/placeholder-profile.jpg'
        if (item.profile_path) {
            src = OriginalImageUrl + item.profile_path;
        }
        return (
            <div className="card">
                <div className="card-image pointer pcard">
                    <LazyLoad height={400}>
                        <img src={src}
                            onClick={() => this.props.gotoItem(item.id)} />
                        <div className="pcard-title">{item.name}</div>
                    </LazyLoad>
                </div>
            </div>
        );
    }
}

export default PeopleCardComponent;