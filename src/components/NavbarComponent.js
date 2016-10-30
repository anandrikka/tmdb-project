'use strict';

import React from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss'; 
    
export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(".button-collapse").sideNav();
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo">TMDB</Link>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/tv">TV</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><a href="mobile.html">Login</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/tv">TV</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><a href="mobile.html">Login</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}