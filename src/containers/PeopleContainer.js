'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react'

import PeopleComponent from '../components/PeopleComponent';
import * as PeopleActions from '../actions/people.actions';

const mapStateToProps = (state) => {
    let {peopleData, appData} = state;
    return {
        appData,
        peopleData
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PeopleActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PeopleComponent);