import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Calendar from "./pages/Calendar";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Calendar} exact />
			</Switch>
		</BrowserRouter>
	);
}
