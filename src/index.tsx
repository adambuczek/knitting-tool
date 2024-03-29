import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

if ('wakeLock' in navigator) {
  const requestWakeLock = async () => {
    try {
      // @ts-ignore
      window.wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      // @ts-ignore
      console.log(`${err.name}, ${err.message}`);
    }
  }
  requestWakeLock();
}


ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400&display=swap"
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
