import React, {Component, PropTypes} from 'react'
import PaginationComponent from './PaginationComponent.jsx';
import RevealCardComponent from './RevealCardComponent.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import { IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';
import axios from 'axios';

class PeopleListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            activePage: 1,
            peopleCategory: this.props.location.query.type || 'popular'
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.loadPeopleListOnType = this.loadPeopleListOnType.bind(this);
    }

    componentDidMount() {
        this.loadPeopleListOnType();
    }

    loadPeopleListOnType(page, peopleCategory) {
        this.props.fetchPeople(peopleCategory || this.state.peopleCategory, page || 1).then(() => {
            let posters = [];
            for (let tv in this.props.peopleData.search.list) {
                posters.push(IMAGE_URI_ORIGINAL + this.props.peopleData.search.list[tv].profile_path);
            }
            axios.all(posters).then(function() {
                this.setState({
                    loading: false
                })
            }.bind(this))
        })
    }

    pageSelect(page) {
        this.setState({
            loading: true,
            activePage: page
        });
        this.loadPeopleListOnType(page);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <LoadingComponent isLoading={this.state.loading}></LoadingComponent>
                    {
                        this.props.peopleData.search.list.map((item, index) => {
                            return (
                                <div className="col s12 m2 l4" key={index}>
                                    <RevealCardComponent item={item}
                                        genres={this.props.appData.tvGenres}>
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
                                pages={this.props.peopleData.search.totalPages}
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

PeopleListComponent.propTypes = {

}

export default PeopleListComponent