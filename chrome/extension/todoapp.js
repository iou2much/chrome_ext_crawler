import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
// import Socket from '../../app/utils/socket'
import './todoapp.css';

// const socket = new Socket();

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');
  // delete initialState.login_state;

  const createStore = require('../../app/store/configureStore');
  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});
