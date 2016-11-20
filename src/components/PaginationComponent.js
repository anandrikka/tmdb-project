import React, {Component, PropTypes} from 'react'

import { Pagination } from 'react-bootstrap';

class PaginationComponent extends Component {
    
    constructor(props) {
        super(props);
    }

    handleSelect(eventKey) {
        this.setState({
            activePage: eventKey
        });  
    }

    componentDidMount() {}

    getPaginationComponent() {
        if (this.props.isSimple) {
            return (
                <Pagination bsSize={this.props.bsSize || 'large'} items={this.props.pages} activePage={this.props.activePage}
                    onSelect={this.props.pageSelect} />
            )
        }
        return (
            <Pagination prev next first last ellipsis boundaryLinks items={this.props.pages} maxButtons={3}
                    activePage={this.props.activePage} onSelect={this.props.pageSelect} />
        );
    }

    render() {
        return this.getPaginationComponent();
    }
}

PaginationComponent.propTypes = {
    pages: React.PropTypes.number.isRequired,
    pageSelect: React.PropTypes.func.isRequired,
    isSimple: React.PropTypes.bool,
    maxPageNumberDisplay: React.PropTypes.number,
    activePage: React.PropTypes.number.isRequired,
    bsSize: React.PropTypes.string
}

export default PaginationComponent