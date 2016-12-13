import React, {Component, PropTypes} from 'react';

import RevealCardComponent from './RevealCardComponent';

class SearchListComponent extends Component {

    componentDidMount() {
         
    }
        

    render() {
        console.log('SearchListComponent', this.props);
        return (
            <div>
                {
                    this.props.searchList.length > 0 ? (
                        this.props.searchList.map((item, index) => {
                            return (
                                <div className="col s12 m12 l6" key={index}>
                                    <RevealCardComponent item={item}
                                        genres={this.props.movieGenres} gotoMovie={this.props.gotoMovie}>
                                    </RevealCardComponent>
                                </div>
                            );
                        })
                    ): ""
                    
                }
            </div>
        );
    }
}

SearchListComponent.propTypes = {
    searchList: React.PropTypes.array.isRequired
};

export default SearchListComponent;