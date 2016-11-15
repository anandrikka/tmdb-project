import React, { Component, PropTypes } from 'react';
import css from '../styles/home.scss';

class HomeComponent extends Component {

    componentDidMount () {
        $(document).ready(function(){
            $('.carousel.home-carousel').carousel({padding:2});
        });         
    }
    
    render() {
        return (
            <div className="container" style={{marginTop:'20px'}}>
                <div className="section">
                    <h5>Movies in Theaters</h5>
                    <div className="carousel home-carousel">
                        <a className="carousel-item" href="#one!"><img src="http://lorempixel.com/250/250/nature/1"/></a>
                        <a className="carousel-item" href="#two!"><img src="http://lorempixel.com/250/250/nature/2"/></a>
                        <a className="carousel-item" href="#three!"><img src="http://lorempixel.com/250/250/nature/3"/></a>
                        <a className="carousel-item" href="#four!"><img src="http://lorempixel.com/250/250/nature/4"/></a>
                        <a className="carousel-item" href="#five!"><img src="http://lorempixel.com/250/250/nature/5"/></a>
                    </div>
                </div>
                <div className="section">
                    <h5>Tv Shows Currently Playing</h5>
                    <div className="carousel home-carousel">
                        <a className="carousel-item" href="#one!"><img src="http://lorempixel.com/250/250/nature/1"/></a>
                        <a className="carousel-item" href="#two!"><img src="http://lorempixel.com/250/250/nature/2"/></a>
                        <a className="carousel-item" href="#three!"><img src="http://lorempixel.com/250/250/nature/3"/></a>
                        <a className="carousel-item" href="#four!"><img src="http://lorempixel.com/250/250/nature/4"/></a>
                        <a className="carousel-item" href="#five!"><img src="http://lorempixel.com/250/250/nature/5"/></a>
                    </div>
                </div>
                <div className="section">
                    <h5>Upcoming Movies</h5>
                    <div className="carousel home-carousel">
                        <a className="carousel-item" href="#one!"><img src="http://lorempixel.com/250/250/nature/1"/></a>
                        <a className="carousel-item" href="#two!"><img src="http://lorempixel.com/250/250/nature/2"/></a>
                        <a className="carousel-item" href="#three!"><img src="http://lorempixel.com/250/250/nature/3"/></a>
                        <a className="carousel-item" href="#four!"><img src="http://lorempixel.com/250/250/nature/4"/></a>
                        <a className="carousel-item" href="#five!"><img src="http://lorempixel.com/250/250/nature/5"/></a>
                    </div>
                </div>
            </div>
            
        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;