import React, { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { MainNavigation } from "./components/Navbar/MainNavigation";
import { Header } from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./components/store/ui-slice";
import FormTSF from "./components/Forms/FormTSF";
import { textSentimentFeedback } from "./components/store/ui-content";
import "./App.scss";

function App() {
	const dispatch = useDispatch();
	const { tab, headerContent, introText } = useSelector((state) => state.ui);

	useEffect(() => {
		dispatch(uiActions.updateHeaderContent());
		dispatch(uiActions.updateIntroText());
	}, [tab]);

	return (
		<React.Fragment>
			<MainNavigation />
			<Container className="App">
				<Header {...headerContent}></Header>
				<Row>
					<Col className="gy-5">
						<p>{introText}</p>
					</Col>
				</Row>
				<Row>
					{tab === textSentimentFeedback && (
						<Col sm={12} lg={8} md={6}>
							<FormTSF></FormTSF>
						</Col>
					)}
				</Row>
			</Container>
		</React.Fragment>
	);
}

export default App;
