'use strict';

import React from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss'; 
    
export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <nav role="navigation" className="navbar navbar-default" style={{borderRadius:'0px'}}>
                <div className="navbar-header">
                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand">TMDB</Link>
                </div>
                <div id="navbarCollapse" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/tv">TV</Link></li>
                        <li className="dropdown">
                            <Link to="/people" data-toggle="dropdown" className="dropdown-toggle" href="#">
                                People
                            </Link>
                            <ul role="menu" className="dropdown-menu">
                                <li><a href="#">Inbox</a></li>
                                <li><a href="#">Drafts</a></li>
                                <li><a href="#">Sent Items</a></li>
                                <li className="divider"></li>
                                <li><a href="#">Trash</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Login</a></li>
                    </ul>
                    <form role="search" className="navbar-form navbar-right">
                        <div className="form-group">
                            <input type="text" placeholder="Search" className="form-control"/>
                        </div>
                    </form>
                    
                </div>
            </nav>
        );
    }
}