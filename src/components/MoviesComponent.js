'use strict';

import React, { Component, PropTypes } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent';
import PaginationComponent from './PaginationComponent';
import axios from 'axios';

class MoviesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1
        }
        this.pageSelect = this.pageSelect.bind(this);
    }

    componentDidMount() {
        this.props.fetchLatestMovies().then(() => {
            let posters = [];
            for (let movie in this.props.moviesData.latestMovies.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.moviesData.latestMovies.list[movie].poster_path);
            }
            axios.all(posters).then(function () {
                this.setState({
                    loading: false,
                    activePage: 1
                })
            }.bind(this))
        })
    }

    pageSelect(page) {
        this.setState({
            loading: true
        });
        this.props.fetchLatestMovies(page).then(() => {
            let posters = [];
            for (let movie in this.props.moviesData.latestMovies.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.moviesData.latestMovies.list[movie].poster_path);
            }
            axios.all(posters).then(function () {
                this.setState({
                    loading: false,
                    activePage: page
                })
            }.bind(this))
        }, () => {
            this.setState({
                loading:false
            })
        })
    }

    getImageSrc(path) {
        if (path) {
            return IMAGE_URI_ORIGINAL + path;
        } else {
            return '../../dist/assets/images/placeholder.png';
            //return 'http://placehold.it/500x500';
        }
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
                                    <img style={{ cursor: 'pointer'}}
                                        className="img-rounded img-responsive"
                                        src={this.getImageSrc(item.poster_path)}
                                        onError={(e)=>{$(e.target).hide()}}/>
                                </Col>
                            );
                        })
                        
                    }
                </Row>
                {
                    !this.state.loading ? (
                        <div style={{ float: 'right' }}>
                            <PaginationComponent style={{ float: 'right' }}
                                pages={this.props.moviesData.latestMovies.totalPages}
                                activePage={this.state.activePage} pageSelect={this.pageSelect}>
                            </PaginationComponent>    
                        </div>
                    ) : ''
                }
                
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;