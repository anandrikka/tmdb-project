'use strict';

import React, { Component, PropTypes } from 'react';
import FilterComponent from './FilterComponent.jsx';

class TelevisionComponent extends Component {
    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div>
                {children}
            </div>
        );
    }
}

TelevisionComponent.propTypes = {

};

export default TelevisionComponent;