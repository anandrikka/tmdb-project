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
                <div className="row">
                    <form className="col s12">
                        <div className="row col s12">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <input id="icon_prefix" type="text" className="validate" />
                            </div>
                        </div>
                    </form>
                </div>
                {children}
            </div>
        );
    }
}

PeoplesComponent.propTypes = {

};

export default PeoplesComponent;