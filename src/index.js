import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./store/authReducer";
import bookReducer from "./store/bookReducer";
import adminReducer from "./store/adminReducer";
import notificationReducer from "./store/notificationReducer";

import { Provider } from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  book    : bookReducer,
  auth    : authReducer,
  admin   : adminReducer,
  notification : notificationReducer
});

const store = createStore(
  rootReducer, 
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
