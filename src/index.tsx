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
import {allOrdersWsActions, userOrdersWsActions} from './services/actions/WsActions';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsAllOrdersUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsUserOrdersUrl: string = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(SocketMiddleware(wsAllOrdersUrl, { ...allOrdersWsActions })),
  applyMiddleware(SocketMiddleware(wsUserOrdersUrl, { ...userOrdersWsActions }, true))
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
