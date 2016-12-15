import React, {Component, PropTypes} from 'react'
import PaginationComponent from './PaginationComponent.jsx';
import SimpleCardComponent from './SimpleCardComponent.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';
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
        this.props.actions.fetchPeople(peopleCategory || this.state.peopleCategory, page || 1).then(() => {
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

    prepareList(list) {
        const listLength = list.length;
        const modifiedList = [];
        for (let i = 0; i < listLength; i++) {
            const listItem = list[i];
            modifiedList.push({
                id: listItem.id,
                image_path: listItem.profile_path,
                title: name
            });
        }
        return modifiedList;
    }

    gotoPeople(id) {
        this.props.history.push('people/' + id);
    }

    render() {
        const list = this.prepareList(this.props.peopleData.search.list);
        return (
            <div>
                <div className="row">
                    {
                        list.map((item, index) => {
                            return (
                                <div className="col s12 m2 l4" key={index}>
                                    <SimpleCardComponent item={item}
                                        genres={this.props.appData.tvGenres}
                                        gotoItem={this.gotoPeople}>
                                    </SimpleCardComponent>
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