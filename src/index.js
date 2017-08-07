import React from 'react';
import ReactDOM from 'react-dom';

//Implementing Redux 1
import {Provider} from 'react-redux';
import store from './store';

//styling
import './styles/app.css';
import './styles/weather-icons-master/css/weather-icons.css';

//For React DOM render
import App from './components/app';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
     <Provider store={store}>
     <App />
      </Provider>,
     document.getElementById('root'));
registerServiceWorker();
