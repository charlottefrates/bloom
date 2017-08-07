import {createStore, applyMiddleware} from 'redux';

//redux-thunk allows us to return a function from an action that gets passed dispatch
// allows us to do asynchronous actions to fetch data
import thunk from 'redux-thunk';


import reducer from './reducers';


export default createStore(reducer,applyMiddleware(thunk));
