import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { Router, Route, Switch } from "react-router-dom";
import { store } from "./store";

import history from "./services/history";

import GlobalStyle from "./global";
import Calendar from "./pages/Calendar";

function App() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<Switch>
					<Route path="/" component={Calendar} />
				</Switch>
			</Router>
			<GlobalStyle />
			<ToastContainer autoClose={3000} />
		</Provider>
	);
}

export default App;
