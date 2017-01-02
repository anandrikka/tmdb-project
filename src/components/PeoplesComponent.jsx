'use strict';

import React, { Component, PropTypes } from 'react';

class PeoplesComponent extends Component {

    componentDidMount () {
        this.props.actions.fetchPeople();
    }
    
    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div>
                {children}
            </div>
        );
    }
}

PeoplesComponent.propTypes = {

};

export default PeoplesComponent;