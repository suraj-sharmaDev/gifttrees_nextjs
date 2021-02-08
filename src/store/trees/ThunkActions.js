/* eslint-disable no-underscore-dangle */
/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : ThunkActions.js
 *******************************************/

import {apiResponseStatuses, httpStatusCodes} from '../../config/constants/ApiServiceConstants';
import {treeInfoService} from '../../services/api';
import * as treesActions from './Actions';
import TreeTransactionUtil from '../../utils/TreeTransactionUtil';

export const fetchTrees = (postBodyData) => async (dispatch) => {
	// when api call is happening we change the mycourses redux state
	dispatch(treesActions.updateTreesStatus(true, apiResponseStatuses.IDLE));

	try {
		const response = await treeInfoService.fetchTrees(postBodyData);
		switch (response.httpStatusCode) {
			case httpStatusCodes.SUCCESS_OK: {
				// lets change the api response for better component consumption
				// so that each component can be well reused
				const treeData = [];
				const dbStatus = response.data.status; 
				// if the data attribute of response.data has length > 0
				// which means the api call was success with some trees
				if (Object.keys(response.data.data).length > 0 && dbStatus === httpStatusCodes.SUCCESS_OK) {
					// since the response is dependent of precision or zoom level
					// precision >= 8.18 will have different response
					let responseTrees;
					let isHitInAttribute = false;
					if (response.data.event.precision >= 8.18) {
						isHitInAttribute = true;
						responseTrees = response.data.data.hits;
					} else {
						responseTrees = response.data.data.cells.buckets;
					}
					const size = responseTrees.length;
					for (let i = 0; i < size; i += 1) {
						let el;
						// when precision was >= 8.18 then we retrieve response in
						// following way
						if (isHitInAttribute) {
							el = {
								lat: responseTrees[i]._source.latitude,
								lng: responseTrees[i]._source.longitude,
								treeDetail: responseTrees[i]._source,
							};
						} else {
							// the marker point is basically a cluster point
							el = {
								count: responseTrees[i].doc_count,
								lat: responseTrees[i].center_lat.value,
								lng: responseTrees[i].center_lon.value,
							};
						}
						treeData.push(el);
					}
				}
				dispatch(treesActions.fetchTrees(apiResponseStatuses.SUCCESS, treeData));
				break;
			}
			default:
				// anything other than 200 means an error
				dispatch(treesActions.fetchTrees(apiResponseStatuses.SUCCESS, []));
				break;
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('error', error);
		dispatch(treesActions.updateTreesStatus(false, apiResponseStatuses.ERROR));
	}
};

export const fetchPlantedTreeCount = (email) => async (dispatch) => {
	dispatch(treesActions.updatePlantedTreesCountStatus(true, apiResponseStatuses.IDLE));

	try {
		const {
			httpStatusCode,
			data: {
				data: {tree_count: totalTree = 0, id: walletId = 0},
			},
		} = await treeInfoService.fetchPlantedTreeCount(email);

		switch (httpStatusCode) {
			case httpStatusCodes.SUCCESS_OK: {
				dispatch(
					treesActions.updatePlantedTreesCountStatus(false, apiResponseStatuses.SUCCESS, {
						totalTree,
						walletId
					}),
				);
				break;
			}
			default:
				dispatch(treesActions.updatePlantedTreesCountStatus(false, apiResponseStatuses.ERROR, null));
				break;
		}
	} catch (error) {
		dispatch(treesActions.updatePlantedTreesCountStatus(false, apiResponseStatuses.ERROR, null));
	}
};

export const fetchAllowedTreeCount = (email) => async (dispatch) => {
	dispatch(treesActions.updateAllowedTreesCountStatus(true, apiResponseStatuses.IDLE));

	try {
		const {
			httpStatusCode,
			data: {
				allowed_tree_count: totalTree = 0,
				list: transactions = {
					panacea: [],
					sustainable_meeting: [],
				},
			},
		} = await treeInfoService.fetchAllowedTreeCount(email);

		switch (httpStatusCode) {
			case httpStatusCodes.SUCCESS_OK: {
				/**
				 * NOTE: We may require a bit of work in this part coz of
				 * we may need to keep track of transactions and respective tree count
				 * To do this we can keep a list of counters for transactions
				 */
				TreeTransactionUtil(transactions).then((res)=>{
					dispatch(
						treesActions.updateAllowedTreesCountStatus(false, apiResponseStatuses.SUCCESS, {
							totalTree,
							transactions: res,
						}),
					);
				})
				break;
			}
			default:
				dispatch(
					treesActions.updateAllowedTreesCountStatus(false, apiResponseStatuses.ERROR, null),
				);
				break;
		}
	} catch (error) {
		dispatch(treesActions.updateAllowedTreesCountStatus(false, apiResponseStatuses.ERROR, null));
	}
};

export const fetchAllClaimedTrees = () => {
	console.log('fetching claimed')
};

export const claimTreeRequest = (transactionId, transactionSystem, tokens, email) => async (dispatch) => {
	const postBodyData = {
		isClaim: true,
		tokens,
		email
	};
	
	if(transactionId){
		postBodyData.transaction_id = transactionId;
		postBodyData.transaction_system = transactionSystem;
	}

	dispatch(treesActions.updateTreesStatus(true, apiResponseStatuses.IDLE));

	try {
		const response = await treeInfoService.claimTreeRequest(postBodyData);
		switch (response.httpStatusCode) {
			case httpStatusCodes.SUCCESS_OK: {
				if(response.data.status === httpStatusCodes.SUCCESS_OK) {
					/**
					 * This status code is concerned with the server
					 * - this block of code will be executed when claiming is done
					 */
					dispatch(treesActions.claimTreeRequest(response.data.message));
				}else {
					dispatch(treesActions.claimTreeRequest(response.data.message));
					// dispatch(treesActions.updateTreesStatus(false, apiResponseStatuses.SUCCESS, response.data.message));
				}
				break;
			}
			default:
				dispatch(treesActions.updateTreesStatus(false, apiResponseStatuses.ERROR, response.data.message));
				break;
		}
	}catch(e) {
		dispatch(treesActions.updateTreesStatus(false, apiResponseStatuses.ERROR));
		console.log(e);
	}
};

export const storeMeetingData = ({urlApiSource, urlSelectedTreeCount, urlTransactionId}) => async (dispatch) => {
	dispatch(treesActions.storeMeetingData(urlApiSource, urlSelectedTreeCount, urlTransactionId));
};

export const chooseTree = ({choosenTree}) => async (dispatch) => {
	dispatch(treesActions.chooseTree(choosenTree));
};

export const unChooseTree = ({unChoosenTree}) => async (dispatch) => {
	dispatch(treesActions.unChooseTree(unChoosenTree));
};

export const resetTreeState = () => async(dispatch) => {
	dispatch(treesActions.resetTreeState());
}