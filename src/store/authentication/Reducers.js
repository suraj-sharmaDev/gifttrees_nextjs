/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Reducers.js
 *******************************************/
import { apiResponseStatuses } from '../../config/constants/ApiServiceConstants';
import authStatuses from '../../config/constants/AuthConstants';
import {
    RESET_AUTH_STATE,
    UPDATE_AUTH_STATUS,
    // UPDATE_AUTH_MESSAGE,
    UPDATE_CREDENTIALS, UPDATE_USER_INFO,
} from './Types';
import Images from '../../config/Images'

const initialState = {
    isLoading: false,
    isAuthPersistChecked: false,
    authStatus: authStatuses.LOGGED_OUT,
    responseStatus: apiResponseStatuses.IDLE,
    message: null,
    credentials: {
        email: '',
        phoneNumber: '',
        refreshToken: '',
        token: '',
        name: '',
        userId: '',
        profileImage: Images.avatarPlaceHolder,
        hasProfileImage: false
    }
};

export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_AUTH_STATE:
            return {
                authStatus: authStatuses.LOGGED_OUT,
                credentials: {
                    email: action.email ?? '',
                    phoneNumber: '',
                    refreshToken: '',
                    token: '',
                    profileImage: Images.avatarPlaceHolder,
                },
                isAuthPersistChecked: false,
                isLoading: false,
                message: action.message ?? null,
                responseStatus: apiResponseStatuses.IDLE,
            }

        case UPDATE_AUTH_STATUS:
            return {
                ...state,
                credentials: {
                    email: action.email ?? ''
                },
                isLoading: action.isLoading,
                message: action.message ?? null,
                responseStatus: action.responseStatus,
            }

        case UPDATE_CREDENTIALS:
            return {
                ...state,
                credentials: {
                    email: action.credentials.attributes.email,
                    refreshToken: action.credentials.signInUserSession.refreshToken.token,
                    token: action.credentials.signInUserSession.accessToken.jwtToken,
                    name: action.credentials.name,
                    userId: action.credentials.userId,
                    profileImage: action.credentials.profileImage,
                    bio: action.credentials.bio
                },
                authStatus: authStatuses.AUTHENTICATED,
                isLoading: false,
            }

        case UPDATE_USER_INFO:

            return {
                ...state,
                authStatus: authStatuses.AUTHENTICATED,
                isLoading: false,
                credentials: {
                    email: state.credentials.email,
                    refreshToken: state.credentials.refreshToken,
                    token: state.credentials.token,
                    name: state.credentials.name,
                    userId: state.credentials.userId,
                    profileImage: action.profileImage,
                    bio: action.bio,
                    hasProfileImage: action.profileImage !== Images.avatarPlaceHolder
                },
            }

        default:
            return state;
    }
}