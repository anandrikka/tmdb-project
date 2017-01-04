import React, { Component } from 'react'
import { Link } from 'react-router';

class FooterComponent extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container hide-on-med-and-down">
                    <div className="row">
                        <div className="col s12 l10 offset-l2">
                            <div className="footer-title">
                                <img className="logo" src="../../dist/assets/images/logo.png"></img>
                                <h5 className="white-text">
                                    Movies, Television Shows, Celebrity Details. All at one place !!
                                </h5>
                            </div>
                            <ul className="footer-links grey-text text-lighten-4 no-m">
                                <li><Link to="/home">Home</Link></li>
                                <li><Link to="/movies">Movies</Link></li>
                                <li><Link to="/tv">Television</Link></li>
                                <li><Link to="/people">People</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        © 2016 This product uses the TMDb API but is not endorsed or certified by TMDb.
                        <div className="grey-text right">
                            <a href="#!">Privacy Policy</a> |
                            <a href="#!">Terms of Service</a> |
                            <a href="#!">Concat Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;