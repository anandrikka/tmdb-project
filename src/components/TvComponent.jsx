'use strict';

import React, { Component, PropTypes } from 'react';

class TvComponent extends Component {
    render() {
        let children = React.cloneElement(this.props.children, this.props);
        return (
            <div className="container" style={{ marginTop: '20px' }}>
                <div className="row">
                    <form className="col s12">
                        <div className="row col s12">
                            <div className="input-field">
                                <i className="material-icons prefix">search</i>
                                <div style={{ position: 'relative', display: 'block' }}>
                                    <input id="icon_prefix" type="text" className="validate" style={{ margin: '0px' }} />
                                    <div style={{ display: 'block', position: 'absolute', backgroundColor: '#f9f9f9', zIndex: '999', width: '100%', boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)', maxHeight:'200px', overflowY:'scroll', overflowX:'hidden' }}>
                                        <ul className="collection search-collection">
                                            <li className="collection-item avatar">
                                                <img src="images/yuna.jpg" alt="" className="circle" />
                                                <span className="title">Title</span>
                                                <p>First Line <br />
                                                    Second Line </p>
                                                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                            </li>
                                            <li className="collection-item avatar">
                                                <i className="material-icons circle">folder</i>
                                                <span className="title">Title</span>
                                                <p>First Line <br />
                                                    Second Line</p>
                                                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                            </li>
                                            <li className="collection-item avatar">
                                                <i className="material-icons circle green">insert_chart</i>
                                                <span className="title">Title</span>
                                                <p>First Line <br />
                                                    Second Line</p>
                                                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                            </li>
                                            <li className="collection-item avatar">
                                                <i className="material-icons circle red">play_arrow</i>
                                                <span className="title">Title</span>
                                                <p>First Line <br />
                                                    Second Line</p>
                                                <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {children}
            </div>
        );
    }
}

TvComponent.propTypes = {

};

export default TvComponent;