'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import RevealCardComponent from './RevealCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import axios from 'axios';

class TvListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1,
            tvCategory: this.props.location.query.type || 'airingToday'
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.loadTvListOnType = this.loadTvListOnType.bind(this);
    }

    componentDidMount() {
        this.loadTvListOnType();
    }

    loadTvListOnType(page, tvCategory) {
        this.props.fetchTvList(tvCategory || this.state.tvCategory, page || 1).then(() => {
            let posters = [];
            for (let tv in this.props.tvData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.tvData.search.list[tv].poster_path);
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
                tvCategory: nextProps.location.query.type
            })
            this.loadTvListOnType(null, nextProps.location.query.type);
        }
    }


    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadTvListOnType(page);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <FilterComponent {...this.props.appData}></FilterComponent>
                    <div className="col s12 m8 l9">
                        <LoadingComponent isLoading={this.state.loading}></LoadingComponent>
                        {
                            this.props.tvData.search.list.map((item, index) => {
                                return (
                                    <div className="col s12 m12 l6" key={index}>
                                        <RevealCardComponent item={item}
                                            genres={this.props.appData.tvGenres}>
                                        </RevealCardComponent>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {
                    !this.state.loading ? (
                        <div style={{ float: 'right' }}>
                            <PaginationComponent
                                pages={this.props.tvData.search.totalPages}
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

TvListComponent.propTypes = {

}

export default TvListComponent