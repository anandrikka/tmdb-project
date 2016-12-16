import React, {Component, PropTypes} from 'react';

import SimpleCardComponent from './SimpleCardComponent';

class SearchListComponent extends Component {
    
    render() {
        return (
            <div>
                {
                    this.props.list.length > 0 ? (
                        this.props.list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col s12 m12 l6">
                                        <SimpleCardComponent
                                            item={item} genres={this.props.genres} gotoItem={this.props.gotoItem}>
                                        </SimpleCardComponent>
                                    </div>
                                    {
                                        (index % 2 === 1) ? (
                                            <div className="clearfix"></div>
                                        ) : ''
                                    }
                                </div>
                            );
                        })
                    ): ''
                }
            </div>
        );
    }
}

SearchListComponent.propTypes = {
    list: React.PropTypes.array.isRequired,
    gotoItem: React.PropTypes.func.isRequired,
    genres: React.PropTypes.object.isRequired,
    type: React.PropTypes.string.isRequired,
    cardType: React.PropTypes.string.isRequired
};

export default SearchListComponent;