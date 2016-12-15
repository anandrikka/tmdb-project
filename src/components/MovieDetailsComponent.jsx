import React, {Component, PropTypes} from 'react'

class MovieDetailsComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetchMovie(this.props.params.id);
    }
    
    render() {
        console.log('MovieDetailsComponent', this.props);
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.moviesData.results[this.props.params.id], null, 2)}
                </pre>
            </div>
        );
    }
}

MovieDetailsComponent.propTypes = {
    
}

export default MovieDetailsComponent;