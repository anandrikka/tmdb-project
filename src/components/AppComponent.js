'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import css from '../styles/app.scss';
import FooterComponent from './FooterComponent';

class AppComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function() {
            $('select').material_select();
            $(".button-collapse").sideNav();
            $('.dropdown-button').dropdown();
            $('.modal-trigger').leanModal();
        });
        this.props.fetchTimezones();
        this.props.fetchMovieGenres();
        this.props.fetchTvGenres();
    }
    
    render() {
        return (
            <div className="main">
                <NavbarComponent {...this.props} />
                {this.props.children}
                <FooterComponent></FooterComponent>
            </div>
        )
    }
}

AppComponent.propTypes = {
    timezones: React.PropTypes.func.isRequired,
    movieGenres: React.PropTypes.func.isRequired,
    fetchTimezones: React.PropTypes.func.isRequired,
    fetchMovieGenres: React.PropTypes.func.isRequired
}

export default AppComponent;