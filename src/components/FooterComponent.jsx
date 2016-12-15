import React, { Component } from 'react'

class FooterComponent extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <div className="container">
                        © 2016 This product uses the TMDb API but is not endorsed or certified by TMDb.
                        <a className="grey-text text-lighten-4 right" href="#!"></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterComponent;