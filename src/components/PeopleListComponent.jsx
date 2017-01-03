import React, {Component, PropTypes} from 'react'
import PaginationComponent from './PaginationComponent.jsx';
import LoadingComponent from './LoadingComponent.jsx';
import { OriginalImageUrl, W185ImageUrl} from '../utilities/AppConstants';
import axios from 'axios';

class PeopleListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            query: '',
            queryTimeout: null,
            dropdownDisplay: { display: 'none' }
        }
        this.pageSelect = this.pageSelect.bind(this);
        this.gotoPeople = this.gotoPeople.bind(this);
        this.queryChanged = this.queryChanged.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchPeople();
    }

    pageSelect(page) {
        this.setState({
            activePage: page
        });
        this.props.actions.fetchPeople(page);
    }

    gotoPeople(id) {
        this.props.actions.clearQueryResults();
        this.context.router.push('people/' + id);
    }

    render() {
        let dropdownDisplay = { display: 'none' };
        const list = this.props.people.search.list;
        const searchList = this.props.people.query_results.results;
        if(searchList.length > 0) {
            dropdownDisplay = { display: 'block' };
        }
        $(window).click(function() {
            dropdownDisplay = { display: 'none' };
        }.bind(this));
        if(list.length > 0) {
            return (
                <div>
                    <div className="row">
                        <div className="col s12 m8 l6 offset-m4 offset-l6">
                            <div className="input-field search-bar">
                                <i className="material-icons prefix">search</i>
                                <input id="icon_prefix" type="text" value={this.state.query}
                                       onChange={this.queryChanged}/>
                                <div className="dropdown-container" style={dropdownDisplay || this.state.dropdownDisplay}>
                                    <ul className="collection search-collection people-items">
                                        {
                                            searchList.map((people, index) => {
                                                const profile_path = people.profile_path;
                                                let imageTag;
                                                if(profile_path && profile_path !== null) {
                                                    const src = W185ImageUrl + profile_path;
                                                    imageTag = <img src={src} className="responsive-img circle"/>
                                                }else {
                                                    let name = '';
                                                    let nameSplit = people.name.split(' ');
                                                    if(nameSplit.length > 0) {
                                                        nameSplit.forEach(function(n){
                                                            name = name + n.substr(0, 1);
                                                        })
                                                    }else {
                                                        name = people.name.substr(0, 2);
                                                    }
                                                    imageTag = (<div className="circle"><h5>{name}</h5></div>);
                                                }
                                                let actedMovies = '';
                                                let actedTv = '';
                                                for(let i=0; i<people.known_for.length; i++) {
                                                    const item = people.known_for[i];
                                                    if(item.media_type === 'movie') {
                                                        actedMovies += item.title;
                                                    }else {
                                                        actedTv += item.name;
                                                    }
                                                    if (i < people.known_for.length - 1) {
                                                        if(actedMovies.length > 0) {
                                                            actedMovies += ', ';
                                                        }
                                                        if(actedTv.length > 0) {
                                                            actedTv += ', ';
                                                        }
                                                    }
                                                }
                                                return (
                                                    <li className="collection-item avatar pointer"
                                                        key={index} onClick={() => this.gotoPeople(people.id)}>
                                                        {imageTag}
                                                        <span className="title">{people.name}</span>
                                                        {actedMovies.length > 0 &&
                                                            <p>Movies: {actedMovies}</p>}
                                                        { actedTv.length > 0 && <p>Tv: {actedTv}</p>}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            list.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="col s12 m4 l3">
                                            <PeopleCardComponent
                                                item={item}
                                                gotoItem={this.gotoPeople}>
                                            </PeopleCardComponent>
                                        </div>
                                        {
                                            (index % 4 === 3) ? (
                                                <div className="clearfix"></div>
                                            ) : ''
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div style={{ float: 'right' }}>
                        <PaginationComponent
                            pages={this.props.people.search.totalPages}
                            activePage={this.state.activePage} pageSelect={this.pageSelect}>
                        </PaginationComponent>
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            );
        }
        return(<div/>);
    }

    queryChanged(e) {
        this.setState({
            query: e.target.value
        });
        if(this.state.queryTimeout) {
            clearTimeout(this.state.queryTimeout);
        }
        this.state.queryTimeout = setTimeout(function() {
            if(this.state.query.length > 3) {
                this.props.actions.fetchQueryedPeople(this.state.query);
            }
            if(this.state.query.length === 0) {
                this.props.actions.clearQueryResults();
            }
        }.bind(this), 1000);
    }


}

PeopleListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default PeopleListComponent;

class PeopleCardComponent extends Component {
    render() {
        const item = this.props.item;
        return (
            <div className="card">
                <div className="card-image pointer pcard">
                    <img src={OriginalImageUrl + item.profile_path} onClick={() => this.props.gotoItem(item.id)}/>
                    <div className="pcard-title">{item.name}</div>
                </div>
            </div>
        );
    }
}