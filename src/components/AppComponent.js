'use strict';

import React, { Component, PropTypes } from 'react';
import NavbarComponent from './NavbarComponent';
import ContainerComponent from './ContainerComponent';
import css from '../styles/app.scss';


class AppComponent extends Component {
    render () {
        return (
            <div>
                <NavbarComponent />
                <ContainerComponent />
            </div>
        )
    }
}

AppComponent.propTypes = {

}

export default AppComponent;