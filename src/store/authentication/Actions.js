/* eslint-disable no-unused-vars */
/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Actions.js
 *******************************************/
import {
    RESET_AUTH_STATE,
    UPDATE_AUTH_STATUS,
    UPDATE_AUTH_MESSAGE,
    UPDATE_CREDENTIALS, UPDATE_USER_INFO,
} from './Types';

export function resetAuthState(
    apiResponseStatus,
) {
    return {
        type: RESET_AUTH_STATE,
        responseStatus: apiResponseStatus,
    };
}

export function updateAuthStatus(
    isLoading,
    apiResponseStatus,
    email,
    message
) {
    return {
        type: UPDATE_AUTH_STATUS,
        isLoading,
        responseStatus: apiResponseStatus,
        email,
        message
    };
}


export function updateCredentials(
    apiResponseStatus,
    credentials,
    name,
    userId,
    profileImage,
    bio
) {

    return {
        type: UPDATE_CREDENTIALS,
        responseStatus: apiResponseStatus,
        credentials: {...credentials, name, userId, profileImage, bio},
    };
}


export function updateUserInfo(
    apiResponseStatus,
    profileImage,
    bio
) {

    return {
        type: UPDATE_USER_INFO,
        responseStatus: apiResponseStatus,
        profileImage,
        bio
    };
}