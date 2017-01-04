'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import css from '../styles/app.scss';

class AppComponent extends Component {
    
    /**
     *Load user details, movie genres and tv genres on load
     */
    componentDidMount() {
        this.props.actions.fetchUserDetails();
        this.props.actions.fetchMovieGenres();
        this.props.actions.fetchTvGenres();
    }
    
    render() {
        return (
            <div id="fullContent">
                <LoadingComponent isLoading={this.props.app.isLoading}></LoadingComponent>
                <NavbarComponent profile = {this.props.app.userInfo} />
                <div id="main" className="container container-top">
                    {this.props.children}
                </div>
                <FooterComponent></FooterComponent>
            </div>
        )
    }
}

/**
 *Mandatory fields that need to be present on component
 */
AppComponent.propTypes = {
    actions: React.PropTypes.object.isRequired
}

export default AppComponent;