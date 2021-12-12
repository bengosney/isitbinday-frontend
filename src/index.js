import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getConfig } from './config';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (getConfig('service_worker')) {
  serviceWorker.register();
} else {
  serviceWorker.unregister();
}

const main = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(
      function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      },
      function (err) {
        console.log('ServiceWorker registration failed: ', err);
      }
    );

    const registration = await navigator.serviceWorker.ready;
    if ('periodicSync' in registration) {
      const status = await navigator.permissions.query({
        name: 'periodic-background-sync',
      });

      if (status.state === 'granted' || true) {
        try {
          await registration.periodicSync.register('news', {
            minInterval: 6 * 60 * 60 * 1000, // 6 hours
          });
          console.log('Periodic background sync registered!');
        } catch (e) {
          console.error(`Periodic background sync failed:\nx${e}`);
        }
      } else {
        console.info('Periodic background sync is not granted.');
      }
    } else {
      console.log('Periodic background sync is not supported.');
    }
  }
};

main();
