'use strict';

import React from 'react';
import css from '../styles/navbar.scss'; 
    
export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.button-collapse').sideNav();
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Movies</a></li>
                        <li><a href="badges.html">Television</a></li>
                        <li><a href="collapsible.html">People</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="sass.html">Movies</a></li>
                        <li><a href="badges.html">Television</a></li>
                        <li><a href="collapsible.html">People</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}