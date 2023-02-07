import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import { headers, introTexts } from "../../components/store/ui-content";

const key = "home";
const headerContent = headers.get(key);
const introText = introTexts.get(key);

export default function Home() {
	return (
		<React.Fragment>
			<Header {...headerContent}></Header>
			<Row>
				<Col className="gy-5">
					<p>{introText}</p>
				</Col>
			</Row>
		</React.Fragment>
	);
}
