import React, {Component} from 'react';
import { IMAGE_URI_ORIGINAL } from '../utilities/AppConstants';

class PeopleCardComponent extends Component {
    render() {
        const item = this.props.item;
        const styles = this.inlineStyles();
        return (
            <div className="card">
                <div className="card-image pointer pcard">
                    <img src={IMAGE_URI_ORIGINAL + item.profile_path} onClick={() => this.props.gotoItem(item.id)}/>
                    <div className="pcard-title">{item.name}</div>
                </div>
            </div>
        );
    }
}

PeopleCardComponent.PropTypes = {};

export default PeopleCardComponent;