import { Auth } from 'aws-amplify';
import {apiResponseStatuses} from '../../config/constants/ApiServiceConstants';
import * as authActions from './Actions';

export const resetForgotPassword = () => async (dispatch) => dispatch(
    authActions.updateForgotPasswordStatus(true, apiResponseStatuses.IDLE),
);

export const forgotPassword = (email) => async (dispatch) => {
    dispatch(
        authActions.updateForgotPasswordStatus(true, apiResponseStatuses.IDLE),
    );

    try {
        const { CodeDeliveryDetails } = await Auth.forgotPassword(email);
        switch (CodeDeliveryDetails.DeliveryMedium) {
            case 'EMAIL': {
                dispatch(
                    authActions.sendVerificationCode(
                        apiResponseStatuses.SENT_VERIFICATION_CODE,
                        email
                    ),
                );
                break;
            }
            default:
                // anything other than 200 means an error
                dispatch(
                    authActions.updateForgotPasswordStatus(
                        false,
                        apiResponseStatuses.ERROR
                    ),
                );
                break;
        }
    } catch (error) {
        dispatch(
            authActions.updateForgotPasswordStatus(
                false,
                apiResponseStatuses.ERROR,
                error.message
            ),
        );
    }
};

export const forgotPasswordSubmit = (email, code, password) => async (dispatch) => {
    try {
        await Auth.forgotPasswordSubmit(email, code, password);
        dispatch(
            authActions.updateForgotPasswordStatus(
                false,
                apiResponseStatuses.SUCCESS,
                'Password changed successfully...!',
                email
            ),
        );
    } catch (error) {
        dispatch(
            authActions.updateForgotPasswordStatus(
                false,
                apiResponseStatuses.CODE_MISMATCH,
                error.message,
                email
            ),
        );
    }
};