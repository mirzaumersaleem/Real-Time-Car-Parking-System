import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB3v6wRpFfeAuDq2sQBG7FhnvTEPAvalkw",
    authDomain: "car-parking-system-a7936.firebaseapp.com",
    databaseURL: "https://car-parking-system-a7936.firebaseio.com",
    projectId: "car-parking-system-a7936",
    storageBucket: "car-parking-system-a7936.appspot.com",
    messagingSenderId: "455719566531"
  };
firebase.initializeApp(config);
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));

