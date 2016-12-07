'use strict';

import React, { Component, PropTypes } from 'react';

class PeopleComponent extends Component {

    componentDidMount () {
        this.props.fetchPeople().then(() => {
            
        })
    }
        

    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container" style={{ marginTop: '20px' }}>
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

PeopleComponent.propTypes = {

};

export default PeopleComponent;