'use strict';

import React from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss';

import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.openLoginDialog = this.openLoginDialog.bind(this);
        this.state = {
            showLoginDialog: false
        }
    }

    componentDidMount() {

    }

    sendLoginRequest() {
        this.props.authenticate();
    }

    openLoginDialog() {
        this.props.showLogin(!this.state.showLoginDialog);
        this.setState({
            showLoginDialog: !this.state.showLoginDialog
        });
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">TMDB</Link>
                        <a href="#" data-activates="mobile-menu" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <a className="dropdown-button" data-beloworigin="true" data-hover="true" data-activates="movies">Movies
                                <i className="material-icons left nav-i-left">local_movies</i>
                                </a></li>
                            <li>
                                <a className="dropdown-button" data-hover="true" data-beloworigin="true" href="#!" data-activates="tv">Television<i className="material-icons left">tv</i>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-button" data-hover="true"  data-beloworigin="true" href="#!" data-activates="people">People<i className="material-icons left">people</i>
                                </a>
                            </li>
                            <li>
                                <a href="mobile.html">Login
                                    <i className="material-icons right">account_circle</i>
                                </a>
                            </li>
                        </ul>
                        <ul className="side-nav" id="mobile-menu">
                            <li><a href="mobile.html">Login</a></li>
                            <li><a href="sass.html">Movies</a></li>
                            <li><a href="badges.html">Television</a></li>
                            <li><a href="collapsible.html">People</a></li>
                        </ul>
                    </div>
                </nav>
                <ul id="movies" className="dropdown-content">
                    <li><Link to="/movies?type=nowPlaying">Now Playing</Link></li>
                    <li><Link to="/movies?type=upcoming">Upcoming</Link></li>
                    <li><Link to="/movies?type=popular">Popular</Link></li>
                    <li><Link to="/movies?type=topRated">Top Rated</Link></li>
                </ul>
                <ul id="tv" className="dropdown-content">
                    <li><a href="#!">Airing Today</a></li>
                    <li><a href="#!">On The Air</a></li>
                    <li><a href="#!">Popular</a></li>
                    <li><a href="#!">Top Rated</a></li>
                </ul>
                <ul id="people" className="dropdown-content">
                    <li><a href="#!">Popular</a></li>
                </ul>
            </div>

        );
    }
}