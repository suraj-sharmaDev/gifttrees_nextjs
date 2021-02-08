/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Actions.js
 *******************************************/
import {
	FETCH_TREES,
	UPDATE_TREES_STATUS,
	UPDATE_PLANTED_TREES_COUNT_STATUS,
	UPDATE_ALLOWED_TREES_COUNT_STATUS,
	CHOOSE_TREES,
	UN_CHOOSE_TREES,
	STORE_MEETING_DATA,
	CLAIM_TREE_REQUEST,
	RESET_TREE_STATE
} from './Types';

export function fetchTrees(apiResponseStatus, treeData) {
	return {
		type: FETCH_TREES,
		responseStatus: apiResponseStatus,
		treeData,
	};
}

export function updateTreesStatus(isLoading, apiResponseStatus, apiResponseMessage = null) {
	return {
		type: UPDATE_TREES_STATUS,
		isLoading,
		responseStatus: apiResponseStatus,
		responseMessage: apiResponseMessage
	};
}

export function storeMeetingData(urlApiSource, urlSelectedTreeCount, urlTransactionId) {
	return {
		type: STORE_MEETING_DATA,
		urlApiSource,
		urlSelectedTreeCount,
		urlTransactionId
	};
}

export function chooseTree(choosenTree) {
	return {
		type: CHOOSE_TREES,
		choosenTree,
	};
}

export function unChooseTree(unChoosenTree) {
	return {
		type : UN_CHOOSE_TREES,
		unChoosenTree
	}
}

export function claimTreeRequest(apiResponseMessage) {
	return {
		type: CLAIM_TREE_REQUEST,
		responseMessage: apiResponseMessage,
	};
}

export function updatePlantedTreesCountStatus(isLoading, apiResponseStatus, responseData) {
	return {
		type: UPDATE_PLANTED_TREES_COUNT_STATUS,
		isLoading,
		responseStatus: apiResponseStatus,
		responseData,
	};
}

export function updateAllowedTreesCountStatus(isLoading, apiResponseStatus, responseData) {
	return {
		type: UPDATE_ALLOWED_TREES_COUNT_STATUS,
		isLoading,
		responseStatus: apiResponseStatus,
		responseData,
	};
}

export function resetTreeState() {
	return {
		type: RESET_TREE_STATE
	}
}