'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import css from '../styles/app.scss';

class AppComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchUserDetails();
        this.props.actions.fetchTimezones();
        this.props.actions.fetchMovieGenres();
        this.props.actions.fetchTvGenres();
    }
    
    render() {
        //let children = React.cloneElement(this.props.children, this.props);
        const userDetails = this.props.appData.userInfo;
        const userActions = {
            fetchUserDetails: this.props.actions.fetchUserDetails
        }
        return (
            <div className="main" id="wrapper">
                <LoadingComponent isLoading={this.props.appData.isLoading}></LoadingComponent>
                <NavbarComponent details = {userDetails} actions = {userActions} />
                <div id="mainview" className="container" style={{marginTop: '20px'}}>{this.props.children}</div>
                <FooterComponent></FooterComponent>
            </div>
        )
    }
}

AppComponent.propTypes = {
    actions: React.PropTypes.object.isRequired
}

export default AppComponent;