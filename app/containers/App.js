import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as Actions from '../actions/actions';
import style from './App.css';

// console.log("=============");
// console.log(state);
// console.log("=============");

@connect(
  state => ({
    state: state.states
  }),
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { state, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header login_state={state.login_state} actions={actions} />
        <MainSection login_state={state.login_state} actions={actions} />
      </div>
    );
  }
}
