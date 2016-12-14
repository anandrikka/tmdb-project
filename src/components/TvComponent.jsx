import React, {Component, PropTypes} from 'react';

class TvComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchTv(this.props.params.id);
    }
    
    render() {
        console.log('TvComponent', this.props);
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.tvData.results[this.props.params.id], null, 2)}
                </pre>
            </div>
        );
    }
}

TvComponent.propTypes = {

};

export default TvComponent;