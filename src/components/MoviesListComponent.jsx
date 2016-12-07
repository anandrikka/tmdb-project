'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import RevealCardComponent from './RevealCardComponent.jsx';
import axios from 'axios';

class MoviesListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1,
            movieCategory: this.props.location.query.type || 'latest'
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.loadMoviesOnType = this.loadMoviesOnType.bind(this);
    }

    componentDidMount() {
        this.loadMoviesOnType();
    }

    loadMoviesOnType(page, movieCategory) {
        this.props.fetchMovies(movieCategory || this.state.movieCategory, page || 1).then(() => {
            let posters = [];
            for (let movie in this.props.moviesData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.moviesData.search.list[movie].poster_path);
            }
            axios.all(posters).then(function() {
                this.setState({
                    loading: false
                })
            }.bind(this))
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.query && nextProps.location.query &&
            this.props.location.query.type !== nextProps.location.query.type) {
            this.setState({
                movieCategory: nextProps.location.query.type
            })
            this.loadMoviesOnType(null, nextProps.location.query.type);
        }
    }


    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadMoviesOnType(page);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <LoadingComponent isLoading={this.state.loading}></LoadingComponent>
                    {
                        this.props.moviesData.search.list.map((item, index) => {
                            return (
                                <div className="col s12 m12 l4" key={index}>
                                    <RevealCardComponent item={item}
                                        genres={this.props.appData.movieGenres}>
                                    </RevealCardComponent>
                                </div>
                            );
                        })
                    }
                </div>
                {
                    !this.state.loading ? (
                        <div style={{ float: 'right' }}>
                            <PaginationComponent
                                pages={this.props.moviesData.search.totalPages}
                                activePage={this.state.activePage} pageSelect={this.pageSelect}>
                            </PaginationComponent>
                        </div>
                    ) : ''
                }
                <div style={{ clear: 'both' }}></div>
            </div>
        );
    }
}

MoviesListComponent.propTypes = {
};

export default MoviesListComponent;