/* eslint-disable */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PeoplesComponent from '../components/PeoplesComponent.jsx';
import * as PeopleActions from '../actions/people.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { people, app } = state;
    return {
        people,
        app
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(PeopleActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(PeoplesComponent);
