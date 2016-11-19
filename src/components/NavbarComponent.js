'use strict';

import React from 'react';
import { Link } from 'react-router';

import css from '../styles/navbar.scss'; 

import { Navbar, Nav, MenuItem, NavDropdown, NavItem } from 'react-bootstrap';
    
export default class NavbarComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
        //     <MenuItem eventKey={4.1}>Action</MenuItem>
        //     <MenuItem eventKey={4.2}>Another action</MenuItem>
        //     <MenuItem eventKey={4.3}>Something else here</MenuItem>
        //     <MenuItem divider />
        //     <MenuItem eventKey={4.3}>Separated link</MenuItem>
        // </NavDropdown>
    }

    render() {
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">TMDB</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1}>Movies</NavItem>
                        <NavItem eventKey={2} href="/tv">TV</NavItem>
                        <NavItem eventKey={3} href="/people">People</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">Login</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}