import React from "react";
import { Col, Row } from "react-bootstrap";
import FormImgine from "../../components/Forms/Imgine/FormImgine";
import StandardHeader from "../../components/Header/StandardHeader";

const key = "imgine";

export default function Imgine(props) {
	return (
		<React.Fragment>
			<StandardHeader dictionaryKey={key} />
			<Row>
				<Col className="col-6">
					<FormImgine />
				</Col>
			</Row>
		</React.Fragment>
	);
}
