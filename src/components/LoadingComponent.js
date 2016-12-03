import React, { Component, PropTypes } from 'react';

class LoadingComponent extends Component {
    render() {
        let displayValue = this.props.isLoading ? 'block' : 'none';
        return (
            <div className="loadingBar" style={{ display: displayValue }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}

LoadingComponent.propTypes = {
    isLoading: React.PropTypes.bool.isRequired
};

export default LoadingComponent;