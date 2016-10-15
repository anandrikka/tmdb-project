'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import css from './styles/main.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            Hello World !!  
            </div>
            
        );
    }

}

ReactDOM.render(<App/>, document.getElementById('app'));
