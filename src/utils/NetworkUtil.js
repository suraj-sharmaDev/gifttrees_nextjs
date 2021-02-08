/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 22 2020
 *  File : NetworkUtil.js
 *******************************************/
/**
 * Encodes URL with path-variables by replacing path-variables prefixed with
 * colon ":" by the corresponding value passed as pathVariables object.
 *
 * Eg: a URL "https://service.example.com/api/v1/users/roles/:roleId" along with
 * pathVariables: { roleId: 32 }
 *
 * transforms to => "https://service.example.com/api/v1/users/roles/32"
 *
 * @param url
 * @param pathVariables
 * @returns encodedUrl
 */

function encodeURLPathVariables(url, pathVariables) {
	let encodedUrl = url;

	Object.entries(pathVariables || {}).forEach(([key, value]) => {
		encodedUrl = encodedUrl.replace(`:${key}`, encodeURIComponent(value));
	});

	return encodedUrl;
}

/**
 * This helps API service functions
 * to return a standard result-object.
 * @param error
 * @param httpsStatusCode
 * @param message
 * @param data
 */

function buildResult(
	error,
	httpStatusCode,
	message,
	data,
) {
	return {
		error: error || null,
		httpStatusCode: httpStatusCode || null,
		message: message || null,
		data: data || null,
	};
}

function getValidationFailureMessage(dataErrors) {
	let message = '';

	const keys = Object.keys(dataErrors);

	keys.forEach((key) => {
		const value = dataErrors[key];
		if (Array.isArray(value)) {
			// array will have messages
			message += value.join('\n');
		} else {
			// recurse if value type is not array
			message += `\n${getValidationFailureMessage(value)}`;
		}
	});

	return message;
}

export default {
	encodeURLPathVariables,
	buildResult,
	getValidationFailureMessage,
};