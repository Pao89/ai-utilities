import React, { useState } from "react";
import { Button, Nav, Offcanvas, Stack } from "react-bootstrap";
import "./About.scss";

export default function About() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<React.Fragment>
			<Nav.Link onClick={handleShow} className="me-2">
				About
			</Nav.Link>
			<Offcanvas show={show} onHide={handleClose} placement="end" className="about-box">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>About</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<p className="lead">
						Hi! I'm{" "}
						<a href="https://github.com/Pao89" target="_blank">
							Paul
						</a>
					</p>
					<p>
						I developed this project with the intention of polishing my skills in React. This project makes use of Google Cloud's AI APIs,
						if you want to effectively use it you will need to insert your own Google Cloud API key and configure it so you can use
						Natural Language Processing and Cloud Vision.
					</p>
					<p>I do not store any of the data you send, i just make use of your session/local storage via a library.</p>
					<p>Libraries i made use of include:</p>
					<Stack gap={1}>
						<div>
							<a href="https://react-bootstrap.github.io/" target="_blank">
								React-Bootstrap
							</a>
						</div>
						<div>
							<a href="https://reactrouter.com/en/main" target="_blank">
								React-Router
							</a>
						</div>
						<div>
							<a href="https://redux-toolkit.js.org/" target="_blank">
								Redux-Toolkit
							</a>
						</div>
						<div>
							<a href="https://formik.org/" target="_blank">
								Formik
							</a>
						</div>
						<div>
							<a href="https://localforage.github.io/localForage/" target="_blank">
								localForge
							</a>
						</div>
					</Stack>
				</Offcanvas.Body>
			</Offcanvas>
		</React.Fragment>
	);
}
