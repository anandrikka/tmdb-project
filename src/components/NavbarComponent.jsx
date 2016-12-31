'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss';

import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { languages } from '../../dist/assets/data/language-countries';

export default class NavbarComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">TMDB</Link>
                        <a href="#" data-activates="mobile-menu" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <NavType link="/movies" title="Movies"
                                iconClass="fa fa-film fa-2x left" />
                            <NavType link="/tv" title="Television"
                                iconClass="fa fa-television fa-2x left" />
                            <NavType link="/people" title="People"
                                iconClass="fa fa-users fa-2x left" />
                            <UserButton profile={this.props.profile}></UserButton>
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li><a href="/api/login">Login</a></li>
                            <li><a href="/movies">Movies</a></li>
                            <li><a href="/tv">Television</a></li>
                            <li><a href="/people">People</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

NavbarComponent.PropTypes = {
    profile: React.PropTypes.object.isRequired
}

class UserButton extends Component {
    render() {
        if (this.props.profile.authenticationFailed) {
            return (
                <li><a href="/api/login">Login<i className="fa fa-user-circle fa-2x right"></i></a></li>
            );
        } else {
            return (
                <li>
                    <a className="dropdown-button" data-beloworigin="true" href="#!" data-hover="true" id="account_user" data-activates="account">
                        {this.props.profile.username} <i className="fa fa-chevron-down"></i>
                    </a>
                    <ul id="account" className="dropdown-content">
                        <NavType link="/Profile" title="Profile" />
                        <li><a href="/api/logout">Logout</a></li>
                    </ul>
                </li>
            )    
        }
    }
}

UserButton.PropTypes = {
    profile: React.PropTypes.object.isRequired
}

class NavType extends Component {
    render() {
        return (
            <li>
                <Link to={this.props.link}>
                    {this.props.title}
                    {this.props.iconClass &&
                        <i className={this.props.iconClass}></i>
                    }
                </Link>
            </li>
        )
    }
}

NavType.PropTypes = {
    link: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
}