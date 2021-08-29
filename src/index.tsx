import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { allOrdersWsActions, userOrdersWsActions } from './services/actions/WsActions';
import createSocketMiddleware from "./middlewares/SocketMiddleware";
import { rootReducer } from "./services/reducers/RootReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsAllOrdersUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsUserOrdersUrl: string = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const publicOrdersMiddleware = createSocketMiddleware(wsAllOrdersUrl, allOrdersWsActions);
const privateOrdersMiddleware = createSocketMiddleware(wsUserOrdersUrl, userOrdersWsActions, true);

const enhancer = composeEnhancers(
  applyMiddleware(thunk, publicOrdersMiddleware, privateOrdersMiddleware)
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
