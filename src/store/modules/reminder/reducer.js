import produce from "immer";
import { STORE_REMINDER, RECEIVE_REMINDER, REQUEST_REMINDER } from "./actions";

const INITIAL_STATE = {
	loading: false,
	remindersData: null,
};

export default function form(state = INITIAL_STATE, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case STORE_REMINDER: {
				draft.loading = true;
				break;
			}

			case REQUEST_REMINDER: {
				draft.loading = true;
				break;
			}

			case RECEIVE_REMINDER: {
				draft.remindersData = action.payload;
				draft.loading = false;
				break;
			}

			default:
		}
	});
}
