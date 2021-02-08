import { SIGN_UP, UPDATE_SIGN_UP_STATUS, VERIFY_ACCOUNT, UPDATE_ACCOUNT_STATUS } from './Types';

export function updateSignUpStatus(isLoading, apiResponseStatus, message) {
    return {
        type: UPDATE_SIGN_UP_STATUS,
        isLoading,
        responseStatus: apiResponseStatus,
        message,
    };
}

export function signUp(apiResponseStatus, message) {
    return {
        type: SIGN_UP,
        responseStatus: apiResponseStatus,
        message,
    };
}

export function verifyAccount(apiResponseStatus, message) {
    return {
        type: VERIFY_ACCOUNT,
        responseStatus: apiResponseStatus,
        message,
    };
}

export function updateAccountStatus(apiResponseStatus) {
    return {
        type: UPDATE_ACCOUNT_STATUS,
        responseStatus: apiResponseStatus
    };
}