import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';

import { checkAuthCookie } from './actions/auth'


const middleware = [
  thunk,
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);
const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

store.dispatch(checkAuthCookie());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
