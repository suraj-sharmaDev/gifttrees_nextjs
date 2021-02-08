/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : ApiServiceConstants.js
 *******************************************/

/**
 * Standard api response status which will be used across the application depending upon the
 * response of api service call (via axios).
 */
export const apiResponseStatuses = {
    // initial
    IDLE: 'IDLE',

    // when succeeding one request.
    SUCCESS: 'SUCCESS',

    // when an error occur.
    ERROR: 'ERROR',

    SENT_VERIFICATION_CODE: 'SENT_CODE',
    CODE_MISMATCH: 'CODE_MISMATCH',
}

/**
 * All the http status codes returned by the api server need to be defined here.
 * This is used to determine the type of API response after API call.
 * Refer: https://www.restapitutorial.com/httpstatuscodes.html
 */
export const httpStatusCodes = {
    // 1xx INFORMATIONAL
    INFORMATIONAL_CONTINUE: 100,

    // 2xx SUCCESS
    SUCCESS_OK: 200,
    SUCCESS_CREATED: 201,
    SUCCESS_NO_CONTENT: 204,

    // 3xx REDIRECTION
    REDIRECTION_MULTIPLE_CHOICES: 300,

    // 4xx CLIENT_ERROR
    CLIENT_ERROR_BAD_REQUEST: 400,
    CLIENT_ERROR_UNAUTHORIZED: 401,

    // 5xx SERVER_ERROR
    SERVER_ERROR_INTERNAL_SERVER_ERROR: 500,
}

// dev api server base address
export const API_SERVER_BASE =
    'https://dev-greenstand.sustainably.run';

export const API_AUTH_SERVER_BASE = 'https://dev-sr-auth.sustainably.run/'

/**
 * All the axios request configuration that needs to be applied while initializing axios service
 * has to be added here.
 */
export const apiServerConfig = {
    baseURL: API_SERVER_BASE,
};

export const apiAuthServerConfig = {
    baseURL: API_AUTH_SERVER_BASE,
};

export const apiEndPoints = Object.freeze({
    authentication: {
        loginByEmailAndPassword: '',
        signUp: '',
        resetPassword: ''
    },

    customerInfo: {
        verifyPanaceaUser: '/panacea-api/verify_panacea_user',
    },

    trees: {
        fetchTrees: '/es-api/fecth_elastic_data',
        fetchPlantedTreeCount: '/api/get_wallet',
        allowedTreeCount: '/api/get_allowed_tree',
        claimTreeRequest: '/api/create_claim_request',
    },

    signUp: 'auth-api/create_user',
    userInfo: 'auth-api/manage_user_public',
    verifyAccount: 'auth-api/verify_user',
});