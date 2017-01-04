import React, { Component } from 'react';
import { OriginalImageUrl } from '../utilities/AppConstants';

class PeopleGallery extends Component {

    componentDidMount() {
        $('#profileImagesSlick').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 3,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: true,
                        centerPadding: '20px',
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    render() {
        if (this.props.profileImages.length > 0) {
            return (
                <div id="profileImagesSlick" >
                    {
                        this.props.profileImages.map((profileImage, index) => {
                            let filePath = profileImage.file_path;
                            if(filePath) {
                                filePath = OriginalImageUrl + filePath;
                                return (
                                    <div key={index} className="col s12 m2 l4">
                                        <img className="responsive-img" data-lazy={filePath} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        } else {
            return (<div style={{ margin: '25px', fontWeight: 800, textAlign: 'center' }}>No Profile Pictures Found</div>)
        }
        
    }
}

export default PeopleGallery;