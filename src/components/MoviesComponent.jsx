'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import RevealCardComponent from './RevealCardComponent.jsx';
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
                    <form className="col s12">
                        <div className="row col s12">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input id="icon_prefix" type="text" className="validate" />
                            </div>
                        </div>
                    </form>
                </div>
                {children}
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;