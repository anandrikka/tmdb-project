'use strict';

import React, { Component, PropTypes } from 'react';
import FilterComponent from './FilterComponent.jsx';

class TVsComponent extends Component {
    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                {children}
            </div>
        );
    }
}

TVsComponent.propTypes = {

};

export default TVsComponent;