/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : RootReducer.js
 *******************************************/
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customerInfoReducer from './customer/Reducers';
import authReducer from './authentication/Reducers';
import treesReducer from './trees/Reducers';
import signUpReducer from './signUp/Reducers';
import forgotPasswordReducer from './forgotPassword/Reducers';


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
    // whitelist: [],    
};

const rootReducer = combineReducers({
    customerInfoReducer,
    authReducer,
    signUpReducer,
    treesReducer: persistReducer(treePersistConfig, treesReducer),
    forgotPasswordReducer
});

const persistedReducer = rootReducer;
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
