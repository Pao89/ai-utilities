import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import TSFScore from "./TSFScore";
import "./TSFAccordionListGroup.scss";

export default function TSFAccordionListGroup(props) {
	const sentences = props.sentences;
	return (
		<Accordion defaultActiveKey="0">
			<Accordion.Header className="tsf-accordion-header-custom">
				Get a more-in-depth view of your analyzed text. (Sentence per sentence)
			</Accordion.Header>
			<Accordion.Body as="ul" className={`list-group w-100 p-0`}>
				{sentences.map((sentence, index) => {
					return (
						<ListGroup.Item key={index}>
							(Score: <TSFScore score={sentence.sentiment.score} />, Magnitude: {sentence.sentiment.magnitude}) :{" "}
							{sentence.text.content}
						</ListGroup.Item>
					);
				})}
			</Accordion.Body>
		</Accordion>
	);
}
