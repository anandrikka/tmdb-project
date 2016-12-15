'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import axios from 'axios';

class MoviesComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('MoviesComponent', this.props);
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container top">
                {children}
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;