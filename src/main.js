import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './UI/app';
import store from './Business/store';


ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById('root'),
);
