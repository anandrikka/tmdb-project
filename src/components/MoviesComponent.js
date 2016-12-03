'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import RevealCardComponent from './RevealCardComponent';
import axios from 'axios';

class MoviesComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                <input type="text" placeholder="Search Movies" id="movieSearch"/>
                {children}
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;