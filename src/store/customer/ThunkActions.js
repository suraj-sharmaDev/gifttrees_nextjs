/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : ThunkActions.js
 *******************************************/

import {apiResponseStatuses, httpStatusCodes} from '../../config/constants/ApiServiceConstants';
import {customerInfoService} from '../../services/api';
import * as panaceaActions from './Actions';
// eslint-disable-next-line no-unused-vars
import * as treesActions from '../trees/Actions';

export const verifyPanaceaUser = (amount, date, time, email) => async (dispatch) => {
	// when api call is happening we change the mycourses redux state
	dispatch(panaceaActions.updateUserStatus(true, apiResponseStatuses.IDLE));

	try {
		const response = await customerInfoService.verifyPanaceaUser(amount, date, time, email);
		switch (response.httpStatusCode) {
			case httpStatusCodes.SUCCESS_OK: {
				dispatch(panaceaActions.verifyPanaceaUser(apiResponseStatuses.SUCCESS, response.data));
				// if bill verification was successfull
				// reset the transaction detail in treesReducer and also call 
				if(response.data.isVerified){
					dispatch(treesActions.resetTreeState())
				}
				break;
			}
			default:
				// anything other than 200 means an error
				dispatch(panaceaActions.updateUserStatus(false, apiResponseStatuses.ERROR));
				break;
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('error', error);
		dispatch(panaceaActions.updateUserStatus(false, apiResponseStatuses.ERROR));
	}
};

export const fetchAllClaimedTrees = () => {};
