import React, {Component, PropTypes} from 'react';

class LoadingComponent extends Component {
    render() {
        console.log(this.props);
        let displayValue = this.props.isLoading ? 'table' : 'none';
        return (
            <div className="loading-container" style={{display:displayValue}}>
                <div className="loading-animation"></div>
                <div className="loading-animation"></div>
                <div className="loading-animation"></div>
            </div>
        );
    }
}

LoadingComponent.propTypes = {
    isLoading: React.PropTypes.bool.isRequired
};

export default LoadingComponent;