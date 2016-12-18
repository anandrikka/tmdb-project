import React, {Component, PropTypes} from 'react';

class TvDetailsComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchTv(this.props.params.id);
    }
    
    render() {
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.tvData.results[this.props.params.id], null, 2)}
                </pre>
            </div>
        );
    }
}

TvDetailsComponent.propTypes = {

};

export default TvDetailsComponent;