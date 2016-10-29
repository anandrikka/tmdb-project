import React, { Component, PropTypes } from 'react';
import { Nav, NavItem } from 'react-bootstrap';

class HomeComponent extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <input className="form-control input-lg" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                            <span className="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                            <a href="#">This is a link</a>
                            <a href="#">This is a link</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card-panel teal">
                        <span className="white-text">I am a very simple card. I am good at containing small bits of information.
                        I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                        </span>
                        </div>
                    </div>
                </div>
            </div>

            

        );
    }
}

HomeComponent.propTypes = {

};

export default HomeComponent;