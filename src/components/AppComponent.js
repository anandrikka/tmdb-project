'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import css from '../styles/app.scss';
import LoginModalComponent from './LoginModalComponent';

class AppComponent extends Component {

    constructor(props) {
        super(props);
        this.showLogin = this.showLogin.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            login: false
        }
    }

    componentDidMount() {
        this.props.fetchTimezones();
        this.props.fetchMovieGenres();
        this.props.fetchTvGenres();
    }

    showLogin(flag) {
        this.setState({
            login: flag
        })
    }   

    hideModal() {
        this.setState({
            login: false
        })
    }

    render() {
        return (
            <div>
                <NavbarComponent {...this.props} showLogin={this.showLogin} />
                <LoginModalComponent show={this.state.login} hideModal={this.hideModal}></LoginModalComponent>
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