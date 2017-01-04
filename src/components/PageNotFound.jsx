import React, {Component} from 'react'

class PageNotFound extends Component {
    render () {
        return (
            <div className="page-not-found">
                <div className="container">
                    <div id="green" className="rgb"></div>
                    <div id="red" className="rgb"></div>
                    <div id="blue" className="rgb"></div>
                    <h1>404</h1>
                    <p>This means nothing was found. Are you lost?</p>
                </div>
            </div>
            
        )
    }
}

export default PageNotFound;