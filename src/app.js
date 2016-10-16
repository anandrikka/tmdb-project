'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import css from './styles/main.scss';
import NavbarComponent from './components/NavbarComponent';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent>
            </div>
            
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
