/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : index.js
 *******************************************/
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './RootReducer';

const isLoggingEnabled = false;

const loggerMiddleware = createLogger({
    predicate: () => isLoggingEnabled,
});

const isClient = typeof window !== 'undefined';
let store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
);

if(isClient){
     store.__PERSISTOR = persistStore(store);
}

export default store;