import React from 'react';
import ReactDOM from 'react-dom/client';
import Apps from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
const root = ReactDOM.createRoot(window.document.getElementById('harsha'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Apps />
      </BrowserRouter>
  </React.StrictMode>
);
console.log("defdskfkmfskfsf",this);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();