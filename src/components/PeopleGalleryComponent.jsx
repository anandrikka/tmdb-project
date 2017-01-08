import React, { Component } from 'react';
import Slider from 'react-slick';
import { OriginalImageUrl } from '../utilities/AppConstants';

class PeopleGallery extends Component {

    constructor(props) {
        super(props);
        this.afterChange = this.afterChange.bind(this);
    }

    afterChange() {
        this.props.afterChange();
    }    

    render() {
        const images = this.props.profileImages.concat(this.props.taggedImages);
        if (images.length > 0) {
            return (
                <Slider {...slickSettings} afterChange={this.afterChange}>
                    {
                        images.map((profileImage, index) => {
                            let filePath = profileImage.file_path;
                            if(filePath) {
                                filePath = OriginalImageUrl + filePath;
                                return (
                                    <div key={index} className="col s12 m2 l4">
                                        <img className="responsive-img" src={filePath} />
                                    </div>
                                )
                            }
                        })
                    }
                </Slider>
            )
        } else {
            return (<div style={{ margin: '25px', fontWeight: 800, textAlign: 'center' }}>No Profile Pictures Found</div>)
        }
        
    }
}

export default PeopleGallery;

const slickSettings = {
    lazyLoad: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2,
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
};