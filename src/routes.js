import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import GlobalStyle from "./global";
import Calendar from "./pages/Calendar";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Calendar} exact />
			</Switch>
			<GlobalStyle />
			<ToastContainer position="top-right" autoClose={3000} />
		</BrowserRouter>
	);
}
