/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Reducers.js
 *******************************************/
import { apiResponseStatuses } from '../../config/constants/ApiServiceConstants';
import { VERIFY_PANACEA_USER, UPDATE_USER_STATUS } from './Types';

const initialState = {
    isLoading: false,
    responseStatus: apiResponseStatuses.IDLE,
    panaceaData: {
        isVerified: null,
        guid: Math.floor((Math.random() * 100) + 1),
        message: null,
        responseData: null
    },
};

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case VERIFY_PANACEA_USER:
            return {
                isLoading: false,
                responseStatus: action.responseStatus,
                panaceaData: {
                    isVerified: action.panaceaData.isVerified,
                    guid: Array.isArray(action.panaceaData.data) ? action.panaceaData.data[0].guid : Math.floor((Math.random() * 100) + 1),
                    message: action.panaceaData.message,
                    responseData: action.panaceaData
                }
            }
        case UPDATE_USER_STATUS:
            return {
                ...state,
                isLoading: action.isLoading,
                responseStatus: action.responseStatus,
            }

        default:
            return state;
    }
}