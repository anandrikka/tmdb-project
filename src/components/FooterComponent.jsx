import React, { Component } from 'react'
import { Link } from 'react-router';

class FooterComponent extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col m6 l4">
                            <img src="../../dist/assets/images/logo.png" className="responsive-img" />
                            <p className="col offset-m4 hide-on-small-only no-tm no-bm grey-text text-lighten-4">Powered by TMDB Free API</p>
                        </div>
                        <div className="col m6 l8 grey-text text-lighten-4">
                            <div className="col s6">
                                <h5>Navigation</h5>
                                <ul>
                                    <li>
                                        <Link className="grey-text text-lighten-4" to="/movies">Movies</Link>
                                    </li>
                                    <li>
                                        <Link className="grey-text text-lighten-4" to="/tv">Television</Link>
                                    </li>
                                    <li>
                                        <Link className="grey-text text-lighten-4" to="/people">People</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s6">
                                 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        <div className="row no-bm">
                            <div className="col s12 m8">
                                <p className="grey-text text-lighten-3">© 2016 This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                            </div>
                            <div className="col s12 m4 center-align">
                                <p>Privacy Policy | Terms of Service | Contact Us</p>
                            </div>
                        </div>    
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;