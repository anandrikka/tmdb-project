import React, {Component, PropTypes} from 'react';

class MoviesComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
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