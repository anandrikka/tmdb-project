import React, {Component, PropTypes} from 'react';

class UserComponent extends Component {

    constructor(props) {
        super(props);
        this.showDropdown = this.showDropdown.bind(this);
    }

    showDropdown() {
        
    }    

    render() {
        return (
            <li>
                <a className="dropdown-button" 
                    data-beloworigin="true" href="#!" data-constrainwidth="false" data-activates="account">{this.props.details.username + ' '}
                    <i className="fa fa-chevron-down"></i>
                </a>
                <ul id="account" className="dropdown-content">
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </li>
        );
    }
}

UserComponent.propTypes = {

};

export default UserComponent;