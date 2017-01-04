import React, { Component } from 'react'

class FooterComponent extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container hide-on-med-and-down">
                    <div className="row">
                        <div className="col s12 l8 offset-l2 left-align">
                            <h5 className="white-text">Film Talkies</h5>
                            <p className="grey-text text-lighten-4">
                                Entertainment Site Build using TMDB API.
                            </p>
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