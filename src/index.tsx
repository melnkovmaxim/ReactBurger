import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers/RootReducer';
import thunk from 'redux-thunk';
import { getLastAction, lastActionMiddleware } from './middlewares/LastActionMiddleware';
import { LOGIN_REQUEST_SUCCESS, LOGOUT_REQUEST, REGISTER_REQUEST_SUCCESS, REFRESH_TOKEN_REQUEST_FAILED } from './services/actions/AuthActions';
import { Cookies } from 'react-cookie';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, lastActionMiddleware));
const store = createStore(rootReducer, enhancer);
store.subscribe(() => {
  const action = getLastAction();
  const cookies = new Cookies();

  switch(action.type) {
    case LOGOUT_REQUEST:
    case REFRESH_TOKEN_REQUEST_FAILED: {
      cookies.remove('token');
      localStorage.removeItem('refresh_token');
      break;
    }
    case LOGIN_REQUEST_SUCCESS:
    case REGISTER_REQUEST_SUCCESS: {
      const accessTokenFromCookie = cookies.get('token');
      const refreshTokenFromStorage = localStorage.getItem('refresh_token');
      
      if (action.accessToken && action.accessToken !== accessTokenFromCookie) {
        const currentDate = new Date();
        //currentDate.setMinutes(currentDate.getMinutes() + 19);
        currentDate.setSeconds(currentDate.getSeconds() + 11);
        cookies.set('token', action.accessToken, { expires: currentDate })
      }
    
      if (action.refreshToken && action.refreshToken !== refreshTokenFromStorage) {
        localStorage.setItem('refresh_token', action.refreshToken);
      }
      break;
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
