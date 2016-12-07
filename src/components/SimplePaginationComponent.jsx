import React from 'react';

export default class SimplePaginationComponent extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <div className="simple-pagination">
  		<span className="fa fa-2x fa-chevron-circle-left" onClick={this.props.prevPageSelect}/>
  		<span className="display">
  			Page {this.props.page} of {this.props.totalPages} ({this.props.totalResults} Results)
  		</span>
  		<span className="fa fa-2x fa-chevron-circle-right" onClick={this.props.nextPageSelect}/>
      </div>
    );
  }
}

SimplePaginationComponent.PropTypes = {
	page: React.PropTypes.number.isRequired,
	totalPages: React.PropTypes.number.isRequired,
	totalResults: React.PropTypes.number.isRequired,
	prevPageSelect: React.PropTypes.func,
	nextPageSelect: React.PropTypes.func
};