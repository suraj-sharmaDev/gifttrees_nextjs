/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Actions.js
 *******************************************/
import { VERIFY_PANACEA_USER, UPDATE_USER_STATUS } from './Types';

export function verifyPanaceaUser(
    apiResponseStatus,
    panaceaData,
) {
    return {
        type: VERIFY_PANACEA_USER,
        responseStatus: apiResponseStatus,
        panaceaData,
    };
}

export function updateUserStatus(
    isLoading,
    apiResponseStatus,
) {
    return {
        type: UPDATE_USER_STATUS,
        isLoading,
        responseStatus: apiResponseStatus,
    };
}
