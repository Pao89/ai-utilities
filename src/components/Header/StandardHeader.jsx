import React from "react";
import { Col, Row } from "react-bootstrap";
import { headers, introTexts } from "../store/ui-content";
import Header from "./Header";

export default function StandardHeader(props) {
	const dictionaryKey = props.dictionaryKey;
	const headerContent = headers.get(dictionaryKey);
	const introText = introTexts.get(dictionaryKey);
	return (
		<React.Fragment>
			<Header {...headerContent} />
			<Row>
				<Col className="gy-5">
					<p>{introText}</p>
				</Col>
			</Row>
		</React.Fragment>
	);
}
