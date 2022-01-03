import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {store} from './store';

const history = createBrowserHistory()


ReactDOM.render(
     <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </Provider>
     </Router>,
  document.getElementById('root')
);

reportWebVitals();
