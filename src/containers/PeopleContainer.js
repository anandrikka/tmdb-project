/* eslint-disable */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PeopleComponent from '../components/PeopleComponent.jsx';
import * as PeopleActions from '../actions/people.actions';

/* eslint-enable */

const mapStateToProps = (state) => {
    const { peopleData, appData } = state;
    return {
        appData,
        peopleData
    };
};

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(PeopleActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(PeopleComponent);
