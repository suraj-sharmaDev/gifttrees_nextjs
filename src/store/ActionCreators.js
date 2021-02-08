/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : ActionCreators.js
 *******************************************/
import * as CustomerInfoActions from './customer/ThunkActions';
import * as AuthenticationActions from './authentication/ThunkActions';
import * as TreesActions from './trees/ThunkActions';

const actionCreators = {
    ...CustomerInfoActions,
    ...AuthenticationActions,
    ...TreesActions
};

export default actionCreators;
