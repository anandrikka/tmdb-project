'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import css from '../styles/app.scss';
import LoginModalComponent from './LoginModalComponent';
import FooterComponent from './FooterComponent';

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
            <div className="main">
                <NavbarComponent {...this.props} showLogin={this.showLogin} />
                <LoginModalComponent></LoginModalComponent>
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