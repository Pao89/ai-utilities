import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { home, textSentimentFeedback } from "../store/ui-content";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";

export const MainNavigation = function (props) {
	return (
		<Navbar variant="dark" bg="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/">AI-Utilities</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-between">
					<Nav>
						{/* 						<LinkContainer to={`/`}>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to={`/text-sentiment-feedback`}>
							<Nav.Link>Text/sentiment/feedback</Nav.Link>
						</LinkContainer>
						<LinkContainer to={`/imgine`}>
							<Nav.Link>Imgine</Nav.Link>
						</LinkContainer> */}
						<NavLink className="nav-link" to="/">
							Home
						</NavLink>
						<NavLink className="nav-link" to="text-sentiment-feedback">
							Text/sentiment/feedback
						</NavLink>
						<NavLink className="nav-link" to="imgine">
							Imgine
						</NavLink>
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
