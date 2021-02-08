/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : Reducers.js
 *******************************************/
import {apiResponseStatuses} from '../../config/constants/ApiServiceConstants';
import {
	FETCH_TREES,
	UPDATE_TREES_STATUS,
	CHOOSE_TREES,
	UN_CHOOSE_TREES,
	STORE_MEETING_DATA,
	UPDATE_PLANTED_TREES_COUNT_STATUS,
	UPDATE_ALLOWED_TREES_COUNT_STATUS,
	CLAIM_TREE_REQUEST,
	RESET_TREE_STATE
} from './Types';

const initialState = {
	isLoading: false,
	isFetchingTrees: false,
	responseStatus: apiResponseStatuses.IDLE,
	responseMessage: null,
	treeData: [],
	urlApiSource: null,
	urlSelectedTreeCount: 1,
	urlTransactionId: null,
	choosenTrees: {},
	plantedTree: -1,
	walletId: -1,
	allowedTree: -1,
	transactions: {},
};

export default function treesReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TREES:
			return {
				...state,
				isFetchingTrees: false,
				responseStatus: action.responseStatus,
				treeData: action.treeData,
			};
		case UPDATE_TREES_STATUS:
			return {
				...state,
				isFetchingTrees: action.isLoading,
				responseStatus: action.responseStatus,
				responseMessage: action.responseMessage				
			};
		case CLAIM_TREE_REQUEST:
			// if the request was successful then we can delete all choosen trees from localstorage
			return {
				...state,
				urlApiSource: null,
				urlSelectedTreeCount: 1,
				urlTransactionId: null,
				choosenTrees: {},
				isFetchingTrees: false,
				responseMessage: action.responseMessage
			}
		case RESET_TREE_STATE:
			return {
				...state,
				isLoading: false,
				isFetchingTrees: false,
				responseStatus: apiResponseStatuses.IDLE,
				responseMessage: null,
				treeData: [],
				urlApiSource: null,
				urlSelectedTreeCount: 1,
				urlTransactionId: null,
				choosenTrees: {},
				transactions: {},
			}	
		case STORE_MEETING_DATA:
			return {
				...state,
				urlApiSource: action.urlApiSource,
				urlSelectedTreeCount: action.urlSelectedTreeCount,
				urlTransactionId: action.urlTransactionId,
				choosenTrees: {}
			};
		case CHOOSE_TREES:
			return {
				...state,
				choosenTrees: {...state.choosenTrees, ...action.choosenTree},
			};
		case UN_CHOOSE_TREES: {
			const key = action.unChoosenTree;
			const { [key]: val, ...rest } = state.choosenTrees;
			return {
				...state,
				choosenTrees: rest
			}
		}
		case UPDATE_PLANTED_TREES_COUNT_STATUS:
			return {
				...state,
				// isLoading: action.isLoading,
				responseStatus: action.responseStatus,
				plantedTree: action.responseData ? action.responseData.totalTree : 0,
				walletId: action.responseData ? action.responseData.walletId : 0
			};
		case UPDATE_ALLOWED_TREES_COUNT_STATUS:
			return {
				...state,
				isLoading: action.isLoading,
				responseStatus: action.responseStatus,
				allowedTree: action.responseData ? action.responseData.totalTree : 0,
				transactions: action.responseData ? action.responseData.transactions : state.transactions,
			};
		default:
			return state;
	}
}
