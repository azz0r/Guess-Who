import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app/app';
// import { Provider } from 'react-redux';
// import configureStore from './store/configure-store';

// const store = configureStore();

ReactDOM.render(
  // <Provider store={store}>
    <App />,
  // </Provider>,
  document.getElementById('root')
);
