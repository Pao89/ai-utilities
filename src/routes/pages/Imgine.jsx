import React from "react";
import { Col, Row } from "react-bootstrap";
import FormImgine from "../../components/Forms/Imgine/FormImgine";
import Header from "../../components/Header/Header";
import { headers, introTexts } from "../../components/store/ui-content";

const key = "imgine";
const headerContent = headers.get(key);
const introText = introTexts.get(key);

export default function Imgine(props) {
	return (
		<React.Fragment>
			<Header {...headerContent} />
			<Row>
				<Col className="gy-5">
					<p>{introText}</p>
				</Col>
			</Row>
			<Row>
				<Col className="col-6">
					<FormImgine />
				</Col>
			</Row>
		</React.Fragment>
	);
}
