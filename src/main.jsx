import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./index.css";
import "./assets/bootstrap/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./components/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorMessage from "./errorPage";
import Home from "./routes/pages/Home";
import TSF from "./routes/pages/TSF";
import { submitTSF as tsfAction, loadTSF as tsfLoad } from "./components/Forms/TSF/FormTSF";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorMessage />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "text-sentiment-feedback",
				element: <TSF />,
				action: tsfAction,
				loader: tsfLoad,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
