import React, {Component, PropTypes} from 'react';
import { IMAGE_URI_500W, IMAGE_URI_780W, IMAGE_URI_ORIGINAL } from '../Utilities/tmdbConstants';

class CardComponent extends Component {
    render() {
        let item = this.props.item;
        let className = 'col-xs-12 col-sm-3 no-p';
        let style = {maxHeight: '200px', width: '100%'}
        //let className = 'col-xs-12 col-sm-3 no-p';
        if(this.props.index%3==0) {
            className = 'col-xs-12 col-sm-4 no-p';
        }
        return (
            <div>
                <img src={IMAGE_URI_ORIGINAL + (item.backdrop_path)} />
            </div>   
        );
    }
}

CardComponent.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default CardComponent;