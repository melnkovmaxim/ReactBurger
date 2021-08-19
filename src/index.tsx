import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import {rootReducer} from './services/reducers/RootReducer';
import thunk from 'redux-thunk';
import SocketMiddleware from './middlewares/SocketMiddleware';
import {publicOrdersWsActions, privateOrdersWsActions} from './services/actions/WsActions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsPublicOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsPrivateOrdersUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(SocketMiddleware(wsPublicOrdersUrl, {
    ...publicOrdersWsActions
  })),
  applyMiddleware(SocketMiddleware(wsPrivateOrdersUrl, {
    ...privateOrdersWsActions
  })));
const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
