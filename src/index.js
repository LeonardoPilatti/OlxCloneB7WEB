import React from 'react';
import ReactDOM from 'react-dom';

// esse import createStore e Provider é de extrema importância para funcionar o redux;
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import Reducers from './Reducers';
// esse const store é importante para o redux também;
const store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
