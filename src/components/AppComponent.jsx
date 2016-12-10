'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent.jsx';
import css from '../styles/app.scss';
import FooterComponent from './FooterComponent.jsx';

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
        this.props.fetchUserDetails();
        this.props.fetchTimezones();
        this.props.fetchMovieGenres();
        this.props.fetchTvGenres();
    }
    
    render() {
        const userDetails = this.props.appData.userInfo;
        const userActions = {
            fetchUserDetails: this.props.fetchUserDetails
        }
        return (
            <div className="main">
                <NavbarComponent details = {userDetails} actions = {userActions} />
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