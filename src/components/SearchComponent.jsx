import React, { Component } from 'react';

class SearchComponent extends Component {

    componentDidMount() {
        
    }
        

    render() {
        return (
            <div className="row search-bar">
                <form className="col s12 m5">
                    <div className="input-field">
                        <div className="dropdown-container">
                            <i className="fa fa-search search-icon"></i>
                            <input id="icon_prefix" type="text" className="validate"/>
                            <div className="search-content">
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
                </form>

            </div>
        );
    }
}

export default SearchComponent;