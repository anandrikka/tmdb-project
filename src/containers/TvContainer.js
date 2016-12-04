'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {Component} from 'react'

import TvComponent from '../components/TvComponent';
import * as TvActions from '../actions/tv.actions';

const mapStateToProps = (state) => {
    let {tvData, appData} = state;
    return {
        appData,
        tvData
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(TvActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TvComponent);