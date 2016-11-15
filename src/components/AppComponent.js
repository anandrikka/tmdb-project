'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import ContainerComponent from './HomeComponent';
import css from '../styles/app.scss';


class AppComponent extends Component {

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <NavbarComponent />
                {this.props.children}
            </div>
        )
    }
}

AppComponent.propTypes = {

}

export default AppComponent;