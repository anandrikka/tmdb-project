import React, {Component, PropTypes} from 'react'

class MovieComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
    }
    
    render() {
        console.log('MovieComponent', this.props);
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.moviesData.results[this.props.params.id], null, 2)}
                </pre>
            </div>
        );
    }
}

MovieComponent.propTypes = {
    
}

export default MovieComponent;