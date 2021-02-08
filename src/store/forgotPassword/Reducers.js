import { apiResponseStatuses } from '../../config/constants/ApiServiceConstants';
import { SEND_VERIFICATION_CODE, UPDATE_FORGOT_PASSWORD_STATUS, SUBMIT_VERIFICATION_CODE } from './Types';

const initialState = {
    isLoading: false,
    responseStatus: apiResponseStatuses.IDLE,
    message: null,
    email: null
};

export default function forgotPasswordReducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_FORGOT_PASSWORD_STATUS:

            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
            }

        case SEND_VERIFICATION_CODE:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
                email: action?.email ?? null,
            }

        case SUBMIT_VERIFICATION_CODE:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
                email: action?.email ?? null,
            }

        default:
            return state;
    }
}