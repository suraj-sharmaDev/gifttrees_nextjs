/******************************************
 *  Author : Suraj Sharma
 *  Created On : Thu Jan 07 2021
 *  File : TreeInfoService.js
 *******************************************/
import { apiEndPoints } from '../../config/constants/ApiServiceConstants';
import NetworkUtil from '../../utils/NetworkUtil';

class TreeInfoService {
    constructor(appAPIServer) {
        this.appAPIServer = appAPIServer;
    }

	/**
	 * API Service method for verifying the bill details.
	 * @param postBodyData
	 * @returns APIResponse
     * 
     * where postBodyData should be of format
     * {
     *  "type":"unclaimed"/"claimed",
     *  "precision": int,
     *  "top_left_point":{"lat" : 1.264669, "lon" : 35.220471},
     *  "bottom_right_point":{"lat" : -80.264669, "lon" : -40.620471},
     * }
	 */

    async fetchTrees(postBodyData) {
        let result = null;

        await this.appAPIServer
            .post(apiEndPoints.trees.fetchTrees, postBodyData)
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

    async fetchPlantedTreeCount(email) {
        let result = {};
        await this.appAPIServer
            .post(apiEndPoints.trees.fetchPlantedTreeCount, {
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

    async fetchAllowedTreeCount(email) {
        let result = {};
        await this.appAPIServer
            .post(apiEndPoints.trees.allowedTreeCount, {
                email,
                'is_list': true
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

    async claimTreeRequest(postBodyData) {
        let result = null;

        await this.appAPIServer
            .post(apiEndPoints.trees.claimTreeRequest, postBodyData)
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

export default TreeInfoService;
