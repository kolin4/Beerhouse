import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// importing reducers
import headerReducer from './store/reducers/headerReducer';
import beersReducer from './store/reducers/beersReducer';

const rootReducer = combineReducers({
    header: headerReducer,
    beers:beersReducer
})

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
