import React from "react";
import { Col, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import { headers } from "../../components/store/ui-content";

const key = "imgine";
const headerContent = headers.get(key);

export default function ImgineResponse(props) {
	return (
		<React.Fragment>
			<Header {...headerContent} />
			<Row>
				<Col className="gy-5">
					<p></p>
				</Col>
			</Row>
			<Row className="justify-content-center">
				<Col className="col-6"></Col>
			</Row>
		</React.Fragment>
	);
}
