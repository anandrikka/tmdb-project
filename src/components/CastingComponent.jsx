import React, {Component, PropTypes} from 'react';
import Slider from 'react-slick';
import { H632ImageUrl } from '../utilities/AppConstants';

class Casting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {
                lazyLoad: true,
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: true,
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            arrows: true,
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }
        }
    }    

    render() {
        if (this.props.cast.length > 0) {
            return (
                <div>
                    <h5 className="center-align">CAST</h5>
                    <Slider {...this.state.settings}>
                        {
                            this.props.cast.map((actor, index) => {
                                const profile_path = actor.profile_path;
                                let src = '../../dist/assets/images/placeholder-profile.jpg'; 
                                if (profile_path && profile_path !== null && profile_path.length > 0) {
                                    src = H632ImageUrl + actor.profile_path;
                                }
                                return (
                                    <div className="col s6 m4 l3" key={index} onClick={() => this.props.goto(actor.id)}>
                                        <div className="relative">
                                            <img className="responsive-img pointer"
                                                key={index} src={src} />
                                            <span className="cast-title hide-on-small-only">
                                                {actor.name} ({actor.character})
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
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