import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Sacramento-Regular.ttf'
import {Helmet} from 'react-helmet';

ReactDOM.render(
  <React.StrictMode>
    <>
    <Helmet>
      <title>shop - albergue de peregrinos porto</title>
      <meta 
        name="description"
        content="WIP" />
    </Helmet>
    <App />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
