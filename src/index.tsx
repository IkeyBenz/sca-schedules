import React from 'react';
import ReactDOM from 'react-dom';
import ReactGa from 'react-ga';

import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './ui/styles.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactGa.initialize('UA-164561407-1');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
