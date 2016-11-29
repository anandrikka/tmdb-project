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
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">TMDB</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/movies">
                            <NavItem eventKey={1}>Movies</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/tv">
                            <NavItem eventKey={2} href="/tv">TV</NavItem>    
                        </LinkContainer>
                        <LinkContainer to="/people">
                            <NavItem eventKey={3} href="/people">People</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#" onClick={this.openLoginDialog}>Login</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}