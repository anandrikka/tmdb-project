import React, {Component, PropTypes} from 'react';

class MoviesComponent extends Component {

    constructor(props, context) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                Movies
            </div>
        );
    }
}

MoviesComponent.propTypes = {
};

export default MoviesComponent;