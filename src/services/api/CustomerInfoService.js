/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : CustomerInfoService.js
 *******************************************/
import { apiEndPoints } from '../../config/constants/ApiServiceConstants';
import NetworkUtil from '../../utils/NetworkUtil';

class CustomerInfoService {
    constructor(appAPIServer) {
        this.appAPIServer = appAPIServer;
    }

	/**
	 * API Service method for verifying the bill details.
	 * @param amount
	 * @param date
     * @param time
     * @param email
	 * @returns APIResponse
	 */

    async verifyPanaceaUser(amount, date, time, email) {
        let result = null;

        await this.appAPIServer
            .post(apiEndPoints.customerInfo.verifyPanaceaUser, {
                amount,
                date,
                time,
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

export default CustomerInfoService;
