/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : ThunkActions.js
 *******************************************/

import {Auth} from 'aws-amplify';
import {apiResponseStatuses} from '../../config/constants/ApiServiceConstants';
import * as authActions from './Actions';
import { authenticationService } from '../../services/api';
import Images from '../../config/Images'

export const resetAuthState = () => async (dispatch) => {
	dispatch(authActions.resetAuthState(apiResponseStatuses.IDLE));
};

export const updateCredentials = ({email, password}) => async (dispatch) => {
	// when api call is happening we change the authentication redux state
	dispatch(authActions.updateAuthStatus(true, apiResponseStatuses.IDLE));

	try {
		const response = await Auth.signIn(email, password);
		switch (response?.attributes?.email_verified) {
			case true: {
				const user = await authenticationService.getUserInfo(email);
				const { data: { data: {first_name: firstName, last_name: lastName, user_id: userId, url: profileImage, bio}}} = user;
				dispatch(authActions.updateCredentials(
					apiResponseStatuses.SUCCESS, 
					response, 
					`${firstName} ${lastName}`, 
					userId, 
					profileImage || Images.avatarPlaceHolder,
					bio || ''
				));
				break;
			}
			default:
				// anything other than 200 means an error
				dispatch(authActions.updateAuthStatus(false, apiResponseStatuses.ERROR));
				break;
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		const {code, message} = error;
		let errorMessage = message;
		if (code === 'UserNotConfirmedException') {
			errorMessage = 'User is not verified'
		}
		dispatch(authActions.updateAuthStatus(false, apiResponseStatuses.ERROR, email, errorMessage));
	}
};

export const updateUserInfo = (profileImage, bio) => async (dispatch) => {
	dispatch(authActions.updateUserInfo(apiResponseStatuses.SUCCESS, profileImage, bio));
}
