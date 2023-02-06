import React from "react";
import { Button, ButtonGroup, Form, Row, Stack } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
/* import { formTSFSliceActions, handleFormSubmission } from "../store/formTSF-slice"; */
import { home, textSentimentFeedback } from "../store/ui-content";
import { buildRequest, url } from "./gcloudTSF";

const schema = Yup.object({
	textArea: Yup.string().min(20, "Must be 20 characters or less").required("The field is required"),
});

export const FormTSF = function (props) {
	const checkForPreviousAnswers = function () {};

	const sendRequest = async (params, url) => {
		try {
			const response = await fetch(url, params);
			if (!response.ok) throw new Error(response);

			const data = await response.json();
			console.log("Request passed! Data:");
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	const submit = (values, formikBag) => {
		formikBag
			.validateForm()
			.then((data) => {
				const textArea = values.textArea;
				const requestParams = buildRequest(textArea);
				sendRequest(requestParams, url);
			})
			.catch((error) => {
				formikBag.resetForm();
				formikBag.setFieldError("textArea", `Something went wrong. (${error.message})`);
			});
		/* console.log("hello"); */
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={submit}
			initialValues={{
				textArea: "",
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
							<Button variant="secondary" type="reset" onClick={props.handleReset}>
								Reset
							</Button>
							<Button variant="primary" type="submit" disabled={!props.isValid}>
								Submit
							</Button>
						</Stack>
					</Row>
				</Form>
			)}
		</Formik>
	);
};

export default FormTSF;
