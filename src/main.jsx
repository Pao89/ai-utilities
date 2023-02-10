import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { Provider } from "react-redux";
import store from "./components/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorMessage from "./errorPage";
import Home from "./routes/pages/Home";
import TSF from "./routes/pages/TSF";
import { submitTSF as tsfAction, loadTSF as tsfLoad } from "./components/Forms/TSF/FormTSF";
import Imgine from "./routes/pages/Imgine";
import { action as imgineAction, loader as imgineLoader } from "./components/Forms/Imgine/FormImgine";
import "./assets/bootstrap/bootstrap.min.css";
import "./index.css";
import ImgineResponse from "./routes/pages/ImgineResponse";
import ImgineCropped, { loadCrop } from "./routes/pages/ImgineCropped";

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
			{
				path: "imgine",
				element: <Imgine />,
				action: imgineAction,
				children: [],
			},
			{
				path: "imgine/response",
				element: <ImgineResponse />,
				loader: imgineLoader,
			},
			{
				path: "imgine/cropped/",
				element: <ImgineCropped />,
				loader: loadCrop,
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
