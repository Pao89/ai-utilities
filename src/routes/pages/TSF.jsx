import React, { useEffect, useState } from "react";
import { Card, CloseButton, Col, Row, Stack } from "react-bootstrap";
import { useFetcher, useLoaderData } from "react-router-dom";
import TSFAccordionListGroup from "../../components/Content/TSFAccordionListGroup";
import TSFScore from "../../components/Content/TSFScore";
import FormTSF from "../../components/Forms/TSF/FormTSF";
import Header from "../../components/Header/Header";
import { headers, introTexts } from "../../components/store/ui-content";

const key = "text-sentiment-feedback";
const headerContent = headers.get(key);
const introText = introTexts.get(key);

export async function loadResult() {}

export default function TSF() {
	const sentimentFeedBack = useLoaderData();
	const [showResponse, setShowResponse] = useState(true);
	let documentSentiment, sentences;

	if (sentimentFeedBack?.response) {
		documentSentiment = sentimentFeedBack.response.documentSentiment;
		sentences = sentimentFeedBack.response.sentences;
	}

	return (
		<React.Fragment>
			<Header {...headerContent} />
			<Row>
				<Col className="gy-5">
					<p>{introText}</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<FormTSF showResponse={setShowResponse} />
				</Col>
			</Row>
			{sentimentFeedBack?.response && showResponse && (
				<Row>
					<Col className="gy-5">
						<Card className="border-dark">
							<Card.Header>
								<Stack direction="horizontal" className="justify-content-between">
									Powered by Google Cloud's Natural Language Processing API
									<CloseButton onClick={() => setShowResponse(false)}></CloseButton>
								</Stack>
							</Card.Header>
							<Card.Body>
								<Card.Title>Sentiment/analysis</Card.Title>
								<Card.Subtitle className="mb-3">
									Score: <TSFScore score={documentSentiment.score} /> - Magnitude: {documentSentiment.magnitude}
								</Card.Subtitle>
								<Card.Text>
									The text was analyzed by Google Cloud's NLP API. The score is a value that ranges from
									<span className="text-danger">-1</span> to <span className="text-success">1</span>, which translates to the
									overall sentiment of the text. The magnitude is a value that ranges from 0 to infinite. It represents how strongly
									the emotion was felt throughout the input. Longer texts with more paragraphs will give a more accurate magnitude
									and score.
								</Card.Text>
								<TSFAccordionListGroup sentences={sentences} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			)}
		</React.Fragment>
	);
}
