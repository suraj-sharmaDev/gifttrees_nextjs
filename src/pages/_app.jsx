/******************************************
 *  Author : Suraj Sharma
 *  Created On : Mon Feb 08 2021
 *  File : _app.jsx
 *******************************************/

import React from 'react';
import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from '../store';

import '../../public/vendor/bootstrap/css/bootstrap.min.css';
import '../../public/css/font-awesome.css';
import '../../public/css/fontawesome-all.css';
import '../../public/css/style.css';
import '../../public/css/bio.css';

const App = ({Component, pageProps}) => {
    return(
        <Provider store={reduxStore}>
            <PersistGate persistor={reduxStore.__PERSISTOR} loading={null}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

const makestore = () => reduxStore;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(App);