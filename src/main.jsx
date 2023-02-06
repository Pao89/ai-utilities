import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./index.css";
import "./assets/bootstrap/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./components/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
