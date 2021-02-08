import { apiResponseStatuses } from '../../config/constants/ApiServiceConstants';
import { SIGN_UP, UPDATE_SIGN_UP_STATUS, VERIFY_ACCOUNT } from './Types';

const initialState = {
    isLoading: false,
    responseStatus: apiResponseStatuses.IDLE,
    message: null,
    detail: {
        email: '',
        firstName: '',
        lastName: '',
    },
    type: SIGN_UP,
    isVerified: false
};

export default function signUpReducer(state = initialState, action) {

    switch (action.type) {
        case UPDATE_SIGN_UP_STATUS:

            return {
                ...state,
                detail: {
                    firstName: action.firstName,
                    lastName: action.lastName,
                    email: action.email,
                },
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
            }

        case SIGN_UP:
            return {
                ...state,
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
            }

        case VERIFY_ACCOUNT:
            return {
                ...state,
                type: VERIFY_ACCOUNT,
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
            }

        default:
            return state;
    }
}