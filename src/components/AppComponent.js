'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import css from '../styles/app.scss';


class AppComponent extends Component {

    componentDidMount() {
        this.props.fetchTimezones();
        this.props.fetchMovieGenres();
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                {this.props.children}
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