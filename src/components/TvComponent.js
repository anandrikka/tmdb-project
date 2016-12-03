'use strict';

import React, { Component, PropTypes } from 'react';

class TvComponent extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="container-fluid">
                TV Components
            </div>
        );
    }
}

TvComponent.propTypes = {

};

export default TvComponent;