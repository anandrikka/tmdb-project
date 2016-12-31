'use strict';

import React, { Component, PropTypes } from 'react';

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

export default TelevisionComponent;