'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import RevealCardComponent from './RevealCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
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
                <div className="row">
                    <FilterComponent {...this.props.appData}></FilterComponent>
                    <div className="col s12 m8 l9">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;