import React, { Component } from 'react';

class PeopleDetailsComponent extends Component {

    componentDidMount() {
        this.props.actions.fetchPeopleDetails(this.props.params.id);
    }

    render() {
        console.log('PeopleDetailsComponent', this.props);
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.peopleData.results[this.props.params.id], null, 2)}
                </pre>
            </div>
        );
    }
}

PeopleDetailsComponent.PropTypes = {};

export default PeopleDetailsComponent;