import React, {Component, PropTypes} from 'react';

class ExpandedCardComponent extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

ExpandedCardComponent.propTypes = {
    data: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired
};

export default ExpandedCardComponent;