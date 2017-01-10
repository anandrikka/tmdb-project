import React, {Component, PropTypes} from 'react'
import Slider from 'react-slick';
import { W185ImageUrl } from '../utilities/AppConstants';

class SimilarResults extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                lazyLoad: true,
                speed: 2000,
                slidesToShow: 6,
                slidesToScroll: 6,
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
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ]
            }
        };
        this.nextSlide = this.nextSlide.bind(this);
    }
    
    nextSlide(index) {
        if (index % 20 >= 12) {
            let page = Math.ceil(index / 20) + 1;
            if (page > this.props.gallery.page &&
                this.props.gallery.page < this.props.gallery.total_pages) {
                this.props.fetchMore(this.props.id, this.props.gallery.page + 1);
            }
        }
    }

    render() {
        const results = this.props.gallery.results;
        return (
            <Slider {...this.state.settings} afterChange={this.nextSlide}>
                {
                    results.map((item, index) => {
                        const poster_path = item.poster_path;
                        let src = '../../dist/assets/images/placeholder-movie.jpg';
                        if (poster_path && poster_path !== null && poster_path.length > 0) {
                            src = W185ImageUrl + poster_path;
                        }
                        return (
                            <div className="col s6 m4 l3" key={index}
                                onClick={() => this.props.goto(item.id)}>
                                <div className="relative" style={{minHeight: '100px'}}>
                                    <img className="responsive-img pointer" src={src} />
                                    {
                                        !poster_path && (
                                            <span className="cast-title">
                                                {item[this.props.nameKey]}
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
        )
    }
}

SimilarResults.propTypes = {
    id: React.PropTypes.number.isRequired,
    gallery: React.PropTypes.object.isRequired,
    fetchMore: React.PropTypes.func.isRequired,
    nameKey: React.PropTypes.string.isRequired
}

export default SimilarResults;