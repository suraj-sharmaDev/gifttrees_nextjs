import { apiEndPoints } from '../../config/constants/ApiServiceConstants';
import NetworkUtil from '../../utils/NetworkUtil';

class SignUpService {
    constructor(appAuthAPIServer) {
        this.appAuthAPIServer = appAuthAPIServer;
    }

    /**
     * API Service method for registering a user.
     * @param firstName
     * @param lastName
     * @param email
     * @param password
     * @returns APIResponse
     */
    async signUp(firstName, lastName, email, password) {
        let result = null;

        await this.appAuthAPIServer
            .post(apiEndPoints.signUp, {
                first_name: firstName,
                last_name: lastName,
                email,
                password
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

    async verifyAccount(token) {
        let result = null;

        await this.appAuthAPIServer
            .post(apiEndPoints.verifyAccount, {
                token
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

export default SignUpService;
