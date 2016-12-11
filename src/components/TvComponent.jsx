'use strict';

import React, { Component, PropTypes } from 'react';
import FilterComponent from './FilterComponent.jsx';

class TvComponent extends Component {
    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container">
                <div className="row">
                    <FilterComponent {...this.props.appData}></FilterComponent>
                    <div className="col s12 m8 l9">
                        {children}
                    </div>
                </div>
                
            </div>
        );
    }
}

TvComponent.propTypes = {

};

export default TvComponent;