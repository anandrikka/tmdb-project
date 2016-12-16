'use strict';

import React, { Component, PropTypes } from 'react';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';
import LoadingComponent from './LoadingComponent.jsx';
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import FilterComponent from './FilterComponent.jsx';
import SearchListComponent from './SearchListComponent.jsx';
import axios from 'axios';

class TvSearchListComponent extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            activePage: 1,
            cardType: 'simple',
            tvCategory: this.props.location.query.type || 'airingToday'
        }

        this.pageSelect = this.pageSelect.bind(this);
        this.loadTvListOnType = this.loadTvListOnType.bind(this);
        this.gotoTv = this.gotoTv.bind(this);
    }

    componentDidMount() {
        this.loadTvListOnType();
    }

    loadTvListOnType(page=1, tvCategory) {
        this.props.actions.fetchTvList(tvCategory || this.state.tvCategory, page).then(() => {
            let posters = [];
            for (let tv in this.props.tvData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.tvData.search.list[tv].backdrop_path);
            }
            axios.all(posters).then(function () {
                this.setState({
                    loading: false
                });
            }.bind(this));
        });
    }

    componentWillReceiveProps(nextProps) {
        // to check whether location query got changed or not, if changed call
        //list to load again
        if (this.props.location.query && nextProps.location.query &&
            this.props.location.query.type !== nextProps.location.query.type) {
            this.setState({
                tvCategory: nextProps.location.query.type
            });
            this.loadTvListOnType(null, nextProps.location.query.type);
        }
    }

    /**
     *Load Page list when page is selected
     */
    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadTvListOnType(page);
    }

    /**
     *Prepare list for cards
     */
    prepareList(list) {
        const listLength = list.length;
        const modifiedList = [];
        for (let i = 0; i < listLength; i++) {
            const listItem = list[i];
            modifiedList.push({
                id: listItem.id,
                image_path: listItem.backdrop_path,
                genre_ids: listItem.genre_ids,
                title: listItem.original_name,
                overview: listItem.overview,
                date: listItem.first_air_date,
                vote_average: listItem.vote_average
            });
        }
        return modifiedList;
    }

    /**
     *Go to individual item when clicked
     */
    gotoTv(id) {
        this.props.history.push('tv/' + id);
    }

    /**
     *Inline styles
     */
    inlineStyles() {
        return {
            paginationRight: {
                float: 'right'
            }
        };
    }

    render() {
        const list = this.prepareList(this.props.tvData.search.list);
        const styles = this.inlineStyles();
        return (
            <div>
                <div className="row">
                    <FilterComponent {...this.props.appData}
                        type="television">
                    </FilterComponent>
                    <div className="col s12 m8 l9">
                        <SearchListComponent list={list}
                            genres={this.props.appData.tvGenreMap}
                            gotoItem={this.gotoTv}
                            type="tv"
                            cardType={this.state.cardType}>
                        </SearchListComponent>
                    </div>
                </div>
                {
                    !this.state.loading ? (
                        <div style={styles.paginationRight}>
                            <PaginationComponent
                                pages={this.props.tvData.search.totalPages}
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

TvSearchListComponent.propTypes = {

}

export default TvSearchListComponent