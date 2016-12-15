'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import SearchListComponent from './SearchListComponent.jsx';
import axios from 'axios';


class MoviesSearchListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            cardType: 'simple',
            activePage: 1,
            movieCategory: this.props.location.query.type || 'latest'
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.loadMoviesOnType = this.loadMoviesOnType.bind(this);
        this.gotoMovie = this.gotoMovie.bind(this);
    }

    componentDidMount() {
        this.loadMoviesOnType();
        $('select').material_select();
    }

    loadMoviesOnType(page=1, movieCategory) {
        this.props.actions.fetchMovies(movieCategory || this.state.movieCategory, page).then(() => {
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

    prepareList(list) {
        const listLength = list.length;
        const modifiedList = [];
        for (let i = 0; i < listLength; i++) {
            const listItem = list[i];
            modifiedList.push({
                id: listItem.id,
                image_path: listItem.backdrop_path,
                genre_ids: listItem.genre_ids,
                title: listItem.original_title,
                overview: listItem.overview,
                date: listItem.release_date,
                vote_average: listItem.vote_average
            });
        }
        return modifiedList;
    }    

    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadMoviesOnType(page);
    }

    gotoMovie(id) {
        this.props.history.push('movies/' + id);
    }

    render() {
        const list = this.prepareList(this.props.moviesData.search.list);
        console.log('this.state.loading', this.state.loading);
        return (
            <div>
                <div className="row">
                    <FilterComponent {...this.props.appData} type="movies"
                        actions={this.props.actions}></FilterComponent>
                    <div className="col s12 m8 l9">
                        <SearchListComponent list={list}
                            genres={this.props.appData.movieGenreMap}
                            gotoItem={this.gotoMovie}
                            type="movies"
                            cardType={this.state.cardType}>
                        </SearchListComponent>
                    </div>
                </div>
                {
                    !this.state.loading ? (
                        <div>
                            <PaginationComponent
                                pages={this.props.moviesData.search.totalPages}
                                activePage={this.state.activePage} pageSelect={this.pageSelect}>
                            </PaginationComponent>
                        </div>
                    ) : ''
                }
                <div className="clear"></div>
            </div>
        );
    }
}

MoviesSearchListComponent.propTypes = {

};

export default MoviesSearchListComponent;