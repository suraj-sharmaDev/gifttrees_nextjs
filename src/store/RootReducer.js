/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : RootReducer.js
 *******************************************/
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import customerInfoReducer from './customer/Reducers';
import authReducer from './authentication/Reducers';
import treesReducer from './trees/Reducers';
import signUpReducer from './signUp/Reducers';
import forgotPasswordReducer from './forgotPassword/Reducers';

/**
 * For server side rendering storage option for persisting wont
 * be accessible
 */

const isClient = typeof window !== 'undefined';
let rootReducer;

if(!isClient) {
    rootReducer = combineReducers({
        customerInfoReducer,
        authReducer,
        signUpReducer,
        treesReducer,
        forgotPasswordReducer
    });
}else {
    /**
     * Codes from below this comment is for scenario when
     * app has reached the clients browser where storage is accessible
     */
    const storage = require('redux-persist/lib/storage').default;
    const rootPersistConfig = {
        key: 'primary',
        storage,
        whitelist: ['authReducer'],
        blacklist: ['treesReducer']
    };

    const treePersistConfig = {
        key: 'treesReducer',
        storage,
        whitelist: ['urlApiSource', 'urlTransactionId', 'urlSelectedTreeCount', 'choosenTrees'],
    };

    rootReducer = persistReducer(rootPersistConfig, combineReducers({
        customerInfoReducer,
        authReducer,
        signUpReducer,
        treesReducer: persistReducer(treePersistConfig, treesReducer),
        forgotPasswordReducer
    }));
}

export default rootReducer;