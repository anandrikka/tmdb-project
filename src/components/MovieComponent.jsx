import React, {Component, PropTypes} from 'react'

class MoviesListComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }
    
    render() {
        console.log('MovieComponent', this.props);
        return (
            <div>
                Movie Component
            </div>
        );
    }
}

MoviesListComponent.propTypes = {

}

export default MoviesListComponent;