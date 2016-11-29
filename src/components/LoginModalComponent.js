'use strict';

import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

class LoginModal extends Component {
    render () {
      return (
        <Modal {...this.props} show={this.props.show} dialogClassName="custom-modal"
          onHide={this.props.hideModal}>
          <Modal.Body>
            <div className="container">
              <div className="row col-xs-12">
                <h3><center>Login</center></h3>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <div class="checkbox">
                          <label>
                            <input type="checkbox"/> Remember me
                          </label>
                        </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    }
}

LoginModal.propTypes = {

}

export default LoginModal;