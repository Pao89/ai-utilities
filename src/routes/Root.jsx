import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import MainNavigation from "../components/Navbar/MainNavigation";

export default function Root() {
	return (
		<React.Fragment>
			<MainNavigation></MainNavigation>
			<Container>
				<Outlet></Outlet>
			</Container>
		</React.Fragment>
	);
}
