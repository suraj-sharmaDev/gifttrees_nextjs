import {apiResponseStatuses, httpStatusCodes} from '../../config/constants/ApiServiceConstants';
import * as authActions from './Actions';
import { signUpService } from '../../services/api'

export const signUp = ({ firstName, lastName, email, password }) => async (dispatch) => {
    dispatch(
        authActions.updateSignUpStatus(true, apiResponseStatuses.IDLE),
    );

    try {
        const response = await signUpService.signUp(firstName, lastName, email, password);
        switch (response.httpStatusCode) {
            case httpStatusCodes.SUCCESS_OK: {
                dispatch(
                    authActions.signUp(
                        apiResponseStatuses.SUCCESS,
                        response.data.message
                    ),
                );
                break;
            }
            default:
                // anything other than 200 means an error
                dispatch(
                    authActions.updateSignUpStatus(
                        false,
                        apiResponseStatuses.ERROR,
                        response.error,
                    ),
                );
                break;
        }
    } catch (error) {
        dispatch(
            authActions.updateSignUpStatus(
                false,
                apiResponseStatuses.ERROR,
                'Something went wrong, Please try-again after sometime.'
            ),
        );
    }
};

export const verifyAccount = (token) => async (dispatch) => {
    // when api call is happening we change the authentication redux state
    dispatch(authActions.updateAccountStatus(true, apiResponseStatuses.IDLE));

    try {
        const {data: {is_success: isSuccess, message}} = await signUpService.verifyAccount(token);

        switch (isSuccess) {
            case true: {
                dispatch(authActions.verifyAccount(apiResponseStatuses.SUCCESS, 'Account verified successfully..!', true));
                break;
            }
            default:
                // anything other than 200 means an error
                dispatch(authActions.verifyAccount(apiResponseStatuses.ERROR, message, false));
                break;
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        dispatch(authActions.verifyAccount(apiResponseStatuses.ERROR, apiResponseStatuses.ERROR, error.message));
    }
};
