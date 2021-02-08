/* eslint-disable class-methods-use-this */
/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : AxiosInterceptors.js
 *******************************************/
import store from '../../store';

class AxiosInterceptors {
	constructor(appAPIServer) {
		this.appAPIServer = appAPIServer;

		this.requestInterceptors = {
			requestAuthorizationInterceptor: this.requestAuthorizationInterceptor,
		};

		this.responseInterceptors = {};
	}

	/**
	 * Request Interceptor that adds Authorization: Bearer token by taking token from authSate in redux store.
	 * @param {AxiosRequestConfig} config
	 */
	requestAuthorizationInterceptor(config) {
		// retrieving authState from redux store.
		const authState = store.getState().authReducer;
		const accessToken = authState.credentials.token;

		// setting authorization header with Bearer token
		return {
			...config,
			headers: {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			},
		};
	}
}

export default AxiosInterceptors;
