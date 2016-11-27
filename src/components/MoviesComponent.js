'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';

class MoviesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        this.props.fetchLatestMovies().then(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <LoadingComponent isLoading={this.state.loading}></LoadingComponent>
                    {
                        this.props.moviesData.latestMovies.list.map((item, index) => {
                            return (
                                <Col sm={3} xs={12} key={index}>
                                    <img style={{ cursor: 'pointer' }} className="img-rounded img-responsive"
                                        src={IMAGE_URI_ORIGINAL + (item.backdrop_path)}
                                        onError={(e)=>{$(e.target).hide()}} />
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;