import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import About from "./About";

export const MainNavigation = function (props) {
	return (
		<Navbar variant="dark" bg="dark" expand="sm">
			<Container>
				<Navbar.Brand href="/">AI-Utilities</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-between">
					<Nav>
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
						<About />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MainNavigation;
