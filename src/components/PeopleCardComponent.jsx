import React, {Component} from 'react';
import { IMAGE_URI_ORIGINAL } from '../Utilities/AppConstants';

class PeopleCardComponent extends Component {

    inlineStyles() {
        const styles = {
            cardHeight: {
                maxHeight: '300px'
            }
        }
        return styles;
    }

    render() {
        const item = this.props.item;
        const styles = this.inlineStyles();
        return (
            <div className="card ccard">
                <div className="card-image pointer">
                    <img style={ styles.cardHeight } src={IMAGE_URI_ORIGINAL + item.profile_path} onClick={() => this.props.gotoItem(item.id)}/>
                </div>
                <div className="card-content">
                    <h6>{item.name}</h6>
                </div>
            </div>
        );
    }
}

PeopleCardComponent.PropTypes = {};

export default PeopleCardComponent;