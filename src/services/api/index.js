/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : index.js
 *******************************************/
import axios from 'axios';
import {ApiServiceConstants} from '../../config/constants';

import AxiosInterceptors from './AxiosInterceptors';

import CustomerInfoService from './CustomerInfoService';
import AuthenticationService from './AuthenticationService';
import SignUpService from './SignUpService';
import TreeInfoService from './TreeInfoService';

// creating an axios api server instance with apiServerConfig.
const appAPIServer = axios.create(ApiServiceConstants.apiServerConfig);
const appAuthAPIServer = axios.create(ApiServiceConstants.apiAuthServerConfig);

// instantiating individual-api services with appAPIServer.
/* NOTE: all individual-api  service instantiation should be here. */
const customerInfoService = new CustomerInfoService(appAPIServer);
const authenticationService = new AuthenticationService(appAPIServer);
const treeInfoService = new TreeInfoService(appAPIServer);
const signUpService = new SignUpService(appAPIServer);

// instantiating axios interceptors.
const axiosInterceptors = new AxiosInterceptors(appAPIServer);
const axiosAuthInterceptors = new AxiosInterceptors(appAuthAPIServer);

// extracting request-interceptors defined in AxiosInterceptors and applying
// them to appAPIServer axios instance.
Object.values(axiosInterceptors.requestInterceptors).forEach((requestInterceptor) => {
	appAPIServer.interceptors.request.use(requestInterceptor);
});

Object.values(axiosAuthInterceptors.requestInterceptors).forEach((requestInterceptor) => {
	appAuthAPIServer.interceptors.request.use(requestInterceptor);
});

// extracting response-interceptors defined in AxiosInterceptors and applying
// them to appAPIServer axios instance.
Object.values(axiosInterceptors.responseInterceptors).forEach((responseInterceptor) => {
	appAPIServer.interceptors.response.use(
		responseInterceptor.onFullFilled,
		responseInterceptor.onRejected,
	);
});

Object.values(axiosAuthInterceptors.responseInterceptors).forEach((responseInterceptor) => {
	appAuthAPIServer.interceptors.response.use(
		responseInterceptor.onFullFilled,
		responseInterceptor.onRejected,
	);
});

// console.log(appAPIServer.interceptors.request);

export {
	appAPIServer,
	appAuthAPIServer,
	customerInfoService,
	authenticationService,
	treeInfoService,
	signUpService,
};
