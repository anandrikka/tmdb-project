import React, {Component, PropTypes} from 'react';
import Slider from 'react-slick';
import { OriginalImageUrl } from '../utilities/AppConstants';


class ItemImageGallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settings: {
                lazyLoad: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: true,
                            centerPadding: '20px',
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            arrows: true,
                            centerPadding: '20px',
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }
        }
        this.afterChange = this.afterChange.bind(this);
    }

    afterChange(slide) {
        const state = this.state;
        if(slide >= this.props.backdrops.length) {
            state.settings.slidesToShow = 3;
            state.settings.slidesToScroll = 3;
        }else {
            state.settings.slidesToShow = 1;
            state.settings.slidesToScroll = 1;
        }
        this.setState(state);
    }

    render() {
        const images = this.props.backdrops.concat(this.props.posters);
        return (
            <Slider {...this.state.settings} afterChange={this.afterChange}>
                {
                    images.map((image, index) => {
                        const image_path = image.file_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (image_path && image_path !== null && image_path.length > 0) {
                            src = OriginalImageUrl + image_path;
                        }
                        let classImage = 'col s6 m4 l4';
                        let styles = {maxHeight: '400px'}
                        if(index < this.props.backdrops.length) {
                            classImage = 'col s12';
                            styles = {maxHeight: ''};
                        }
                        return (
                            <div className={classImage} key={index} >
                                <div className="relative" style={styles}>
                                    <img className="responsive-img pointer"
                                         key={index} src={src} />
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        )
    }
}

ItemImageGallery.propTypes = {
    backdrops: React.PropTypes.array.isRequired,
    posters: React.PropTypes.array.isRequired
};

export default ItemImageGallery;