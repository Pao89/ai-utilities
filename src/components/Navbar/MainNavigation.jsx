import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { home, textSentimentFeedback } from "../store/ui-content";

export const MainNavigation = function (props) {
	const dispatch = useDispatch();

	const handleNavigation = (selectedNav) => {
		dispatch(uiActions.updateTab(selectedNav));
	};

	return (
		<Navbar variant="dark" bg="dark" expand="sm">
			<Container>
				<Navbar.Brand href={`#${home}`}>AI-Utilities</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-between">
					<Nav defaultActiveKey={home} onSelect={handleNavigation}>
						<Nav.Link eventKey={home} href={`#${home}`}>
							Home
						</Nav.Link>
						<Nav.Link eventKey={textSentimentFeedback} href={`#${textSentimentFeedback}`}>
							Text/sentiment/feedback
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="#link">About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MainNavigation;
