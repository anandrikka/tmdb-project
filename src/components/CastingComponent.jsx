import React, {Component, PropTypes} from 'react';
import { H632ImageUrl } from '../utilities/AppConstants';
var Slider = require('react-slick');

class Casting extends Component {
    componentDidMount() {
        const id = '#' + this.props.id;
        $(id).slick({
            lazyLoad: 'ondemand',
            slidesToShow: 5,
            slidesToScroll: 5,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    }
    render() {
        if (this.props.cast.length > 0) {
            return (
                <div>
                    <h5 className="center-align">CAST</h5>
                    <div id={this.props.id}>
                        {
                            this.props.cast.map((actor, index) => {
                                const profile_path = actor.profile_path;
                                let src = '../../dist/assets/images/placeholder-profile.jpg'; 
                                if (profile_path && profile_path !== null && profile_path.length > 0) {
                                    src = H632ImageUrl + actor.profile_path;
                                }
                                return (
                                    <div className="col s6 m4 l3" key={index} >
                                        <div className="relative">
                                            <img className="responsive-img pointer"
                                                key={index} data-lazy={src} />
                                            <span className="cast-title">
                                                {actor.name} ({actor.character})
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
        return (<div></div>);
    }
}

Casting.propTypes = {
    id: React.PropTypes.string.isRequired,
    cast: React.PropTypes.array.isRequired
};

export default Casting;