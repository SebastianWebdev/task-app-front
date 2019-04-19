import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
//import Worker from 'worker-loader!./Worker.js';


//const dataWorker = new SharedWorker('./web-workers/dataManagWorker.js');

window.addEventListener('drop', (e) => {
    e.preventDefault()
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

