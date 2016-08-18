import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import './styles/index.css';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

const store = configureStore();

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
