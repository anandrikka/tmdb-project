import React, {Component} from 'react';

class ItemLabel extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <p><b>{this.props.label}</b></p>
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default ItemLabel;

ItemLabel.propTypes = {
    className: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.any.isRequired
}