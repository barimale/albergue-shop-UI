import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Sacramento-Regular.ttf';

ReactDOM.render(
  <React.StrictMode>
    <>
      <Helmet>
        <title>shop - albergue de peregrinos porto</title>
        <meta
          name="description"
          content="Shop - Albergue De Peregrinos Porto"
        />
      </Helmet>
      <App />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
