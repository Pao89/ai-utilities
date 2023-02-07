import React from "react";
import { Container, Row, Stack } from "react-bootstrap";
import { useRouteError } from "react-router";
import MainNavigation from "./components/Navbar/MainNavigation";

export default function ErrorMessage() {
	const error = useRouteError();
	console.error(error);

	return (
		<React.Fragment>
			<MainNavigation />
			<Container>
				<Row>
					<Stack className="flex-column align-items-center gy-5" gap={2}>
						<h1>Oops!</h1>
						<p>Sorry, an unexpected error has occured.</p>
						<p className="text-secondary">
							<i>{error.statusText || error.message}</i>
						</p>
					</Stack>
				</Row>
			</Container>
		</React.Fragment>
	);
}
