/******************************************
 *  Author : Suraj Sharma
 *  Created On : Mon Dec 28 2020
 *  File : AuthenticationService.js
 *******************************************/
import { apiEndPoints } from '../../config/constants/ApiServiceConstants';
import NetworkUtil from '../../utils/NetworkUtil';

class AuthenticationService {
    constructor(appAPIServer) {
        this.appAPIServer = appAPIServer;
    }

    /**
     * API Service method for retrieving some demo data.
     * @returns APIResponse
     */
    async login() {
        let result = null;

        await this.appAPIServer
            .get(apiEndPoints.customerInfo.fetchOneTodo)
            .then(
                // onFullFilled
                (value) => {
                    result = NetworkUtil.buildResult(
                        null,
                        value.status,
                        null,
                        value.data,
                    );
                },

                // onRejected
                (reason) => {
                    const { response } = reason;

                    result = NetworkUtil.buildResult(
                        response?.data?.message,
                        response?.status,
                        response?.data.message,
                        null,
                    );
                },
            )
            .catch((error) => {
                throw error;
            });

        return result;
    }

    async getUserInfo(email) {
        let result = null;

        await this.appAPIServer
            .post(apiEndPoints.userInfo, {
                email
            })
            .then(
                // onFullFilled
                (value) => {
                    result = NetworkUtil.buildResult(
                        null,
                        value.status,
                        null,
                        value.data,
                    );
                },

                // onRejected
                (reason) => {
                    const { response } = reason;

                    result = NetworkUtil.buildResult(
                        response?.data?.message,
                        response?.status,
                        response?.data.message,
                        null,
                    );
                },
            )
            .catch((error) => {
                throw error;
            });

        return result;
    }
}

export default AuthenticationService;
