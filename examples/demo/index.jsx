import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
(() => {
  const app = document.createElement('div');

  document.body.appendChild(app);

  document.body.style.margin = '10px';
  document.body.style.padding = '0px';
  document.body.style.width = '500px';

  ReactDOM.render(<App />, app);
})();