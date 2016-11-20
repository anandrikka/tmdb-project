import React, {Component, PropTypes} from 'react';
import { IMAGE_URI_500W } from '../Utilities/tmdbConstants';

class CardComponent extends Component {
    render() {
        let card = {
            border: '1px solid #ccc',
            marginBottom: '20px',
            position: 'relative',
            zIndex:'9999'
        };
        let item = this.props.item;
        return (
            <div className="col-xs-12 col-sm-3">
                <div style={card}>
                    <div style={{ position: 'absolute', color:'#fff', right:'0', padding:'10px' }}>
                        <span className="fa fa-heart-o fa-2x"></span>
                    </div>
                    <img className="img-responsive" style={{ maxHeight: '300px', width: '100%' }} src={IMAGE_URI_500W + (item.poster_path || item.backdrop_path)} />
                </div>
            </div>
        );
    }
}

CardComponent.propTypes = {
    item: React.PropTypes.object.isRequired
};

export default CardComponent;