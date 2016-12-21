'use strict';

import React from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss';

import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserComponent  from './UserDropdownComponent.jsx';
import { languages } from '../../dist/assets/data/language-countries';

export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    
    loginPopup() {
        // href="/api/login" target="popup" onClick={this.loginPopup}
        window.open('/api/login', 'popup', 'width=600,height=600');
        return false;
    }

    renderUserButton() {
        if (this.props.details.authenticationFalied) {
            return (
                <li>
                    <a href="/api/login">Login
                        <i className="material-icons right">account_circle</i>
                    </a>
                </li>
            );
        }
        return (
            <li>
                <a className="dropdown-button" data-beloworigin="true" href="#!" data-hover="true" id="account_user" data-activates="account">
                    {this.props.details.username ? this.props.details.username : ''} {this.props.details.username ? <i className="fa fa-chevron-down"></i>: ''}
                </a>
                <ul id="account" className="dropdown-content">
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/api/logout">Logout</a></li>
                </ul>
            </li>
        );
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
                            <li>
                                <Link to="/movies">Movies
                                    <i className="material-icons left nav-i-left">local_movies</i>
                                </Link>
                            </li>
                            <li>
                                <a className="dropdown-button" data-hover="true"
                                   data-beloworigin="true" href="#!" data-activates="tv">Television<i className="material-icons left">tv</i>
                                </a>
                            </li>
                            <li>
                                <Link to="/people">People
                                    <i className="material-icons left">people</i>
                                </Link>
                            </li>
                            {this.renderUserButton()}
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li><a href="/api/login">Login</a></li>
                            <li><a href="/movies">Movies</a></li>
                            <li><a href="/tv">Television</a></li>
                            <li><a href="/people">People</a></li>
                        </ul>
                    </div>
                </nav>
                <ul id="tv" className="dropdown-content">
                    <li><Link to="/tv?type=airingToday">Airing Today</Link></li>
                    <li><Link to="/tv?type=onAir">On The Air</Link></li>
                    <li><Link to="/tv?type=popular">Popular</Link></li>
                    <li><Link to="/tv?type=topRated">Top Rated</Link></li>
                </ul>
            </div>
        );
    }
}