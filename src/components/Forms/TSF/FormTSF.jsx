import React from "react";
import { Button, ButtonGroup, Form, Row, Stack } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { buildRequest, url } from "./gcloudTSF";
import { useLoaderData, useNavigation, useSubmit } from "react-router-dom";

const schema = Yup.object({
	textArea: Yup.string().min(20, "Must be 20 characters or less").required("The field is required"),
});

const sessionKey = "tsf-response";

export async function loadTSF({ params }) {
	return JSON.parse(sessionStorage.getItem(sessionKey));
}

const sendRequest = async (params, url) => {
	try {
		const response = await fetch(url, params);
		if (!response.ok) throw new Error(response);

		const data = await response.json();
		console.log("Request passed! Data:");
		console.log(data);
		return data;
	} catch (err) {
		console.error(err);
	}
};

export async function submitTSF({ request, params }) {
	const formData = await request.formData();
	const values = Object.fromEntries(formData);
	const textArea = values.textArea;
	const isInSession = JSON.parse(sessionStorage.getItem(sessionKey))?.textArea === textArea;
	if (!isInSession) {
		const request = buildRequest(textArea);
		const response = await sendRequest(request, url);
		const sessionItem = {
			textArea: textArea,
			response: response,
		};
		sessionStorage.setItem(sessionKey, JSON.stringify(sessionItem));
	}
	return null;
}

export default function FormTSF(props) {
	const sentimentFeedBack = useLoaderData();
	const submit = useSubmit();
	const navigation = useNavigation();
	const showResponse = props.showResponse;
	const checkForPreviousAnswers = function () {};

	const textAreaValue = sentimentFeedBack?.textArea;
	const initialFormState = { values: { textArea: "" } };
	return (
		<Formik
			enableReinitialize={true}
			validationSchema={schema}
			onSubmit={async (values) => {
				submit(values, { method: "post" });
				showResponse(true);
			}}
			initialValues={{
				textArea: !!textAreaValue ? textAreaValue : "",
			}}
		>
			{(props) => (
				<Form noValidate onSubmit={props.handleSubmit}>
					<Form.Group controlId="textArea">
						<Form.Label>The text to process</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							type="textarea"
							onChange={props.handleChange}
							onBlur={props.handleBlur}
							value={props.values.textArea}
							isValid={props.touched.textArea && !props.errors.textArea}
							isInvalid={props.errors.textArea}
						></Form.Control>
						<Form.Text id="textArea">The text for the review must be atleast 20 characters long.</Form.Text>
						<Form.Control.Feedback type="invalid">{props.errors.textArea}</Form.Control.Feedback>
						<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Row>
						<Stack direction="horizontal" gap={2} className="gy-3 justify-content-end">
							<Button
								variant="secondary"
								type="reset"
								onClick={() => {
									props.resetForm(initialFormState);
								}}
							>
								Reset
							</Button>
							<Button variant="primary" type="submit" disabled={!props.isValid || navigation.state === "submitting"}>
								{navigation.state === "submitting" ? "Submitting" : "Send"}
							</Button>
						</Stack>
					</Row>
				</Form>
			)}
		</Formik>
	);
}
