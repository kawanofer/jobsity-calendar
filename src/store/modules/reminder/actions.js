export const STORE_REMINDER = "@reminder/STORE_REMINDER";
export const RECEIVE_REMINDER = "@reminder/RECEIVE_REMINDER";
export const REQUEST_REMINDER = "@reminder/REQUEST_REMINDER";

export function requestReminderData() {
	return {
		type: REQUEST_REMINDER,
	};
}

export function receiveReminderData(data) {
	return {
		type: RECEIVE_REMINDER,
		payload: data,
	};
}

export function storeReminderData(params) {

	return {
		type: STORE_REMINDER,
		payload: params,
	};
}
