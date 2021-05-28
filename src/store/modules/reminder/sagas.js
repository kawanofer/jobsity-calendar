import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
	STORE_REMINDER,
	storeReminderData,
	REQUEST_REMINDER,
	receiveReminderData,
} from "./actions";

export function sendReminder(data) {
	try {
		
		window.localStorage.setItem(
			"jobsityCalendar",
			JSON.stringify(data.payload)
		);
		put(storeReminderData(true));
	} catch (err) {
		console.log("Error -> ", err);
		toast.error("Register data failed.");
	}
}

export function* getReminder() {
	try {
		const values = JSON.parse(
			window.localStorage.getItem("jobsityCalendar")
		);
		yield put(receiveReminderData(values));
	} catch (err) {
		console.log("Error -> ", err);
		put(receiveReminderData(false));
		toast.error("Request data failed.");
	}
}

export default all([
	takeLatest(STORE_REMINDER, sendReminder),
	takeLatest(REQUEST_REMINDER, getReminder),
]);
