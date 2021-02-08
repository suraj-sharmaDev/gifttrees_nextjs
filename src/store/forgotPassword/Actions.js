import { SEND_VERIFICATION_CODE, UPDATE_FORGOT_PASSWORD_STATUS } from './Types';

export function updateForgotPasswordStatus(isLoading, apiResponseStatus, message, email) {
    return {
        type: UPDATE_FORGOT_PASSWORD_STATUS,
        isLoading,
        responseStatus: apiResponseStatus,
        message,
        email
    };
}

export function sendVerificationCode(apiResponseStatus, email) {
    return {
        type: SEND_VERIFICATION_CODE,
        responseStatus: apiResponseStatus,
        email
    };
}