import React, { Component } from 'react'

class FooterComponent extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <div className="container">
                        © 2016 All Content belongs to TMDB. This is a non profit website which using APIs provided by TMDB.
                        <a className="grey-text text-lighten-4 right" href="#!"></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;