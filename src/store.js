import {createStore, applyMiddleware} from 'redux';
//redux-thunk allows us to return a function from an action that gets passed dispatch
// allows us to do asynchronous actions to fetch data
import thunk from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux';
import {browserHistory} from 'react-router';

import reducer from './reducers';



const browserMiddleware = routerMiddleware(browserHistory);
//addition of browserHistory
//https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions
const store = createStore(reducer,applyMiddleware(thunk,browserMiddleware));

// original store with thunk
const storeWithout = createStore(reducer,applyMiddleware(thunk));

export default store;
