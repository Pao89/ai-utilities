import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Button, Form, Row, Stack } from "react-bootstrap";
import { redirect, useNavigation, useSubmit } from "react-router-dom";
import localforage from "localforage";
import { getObjectLocalization } from "./gcloudImgine";

export async function loader() {
	const response = sessionStorage.getItem("response");
	if (!response) throw new Error("You shouldn't be here");
	return null;
}

const getKeyByImgName = async function (imgName) {
	return localforage.keys().then((keys) => keys.findIndex((imgNameOfKey) => imgNameOfKey === imgName));
};

export async function action({ request }) {
	const formData = await request.formData();
	const values = Object.fromEntries(formData);
	const img = values;
	/* getKeyByImgName(img.name); */
	const hasItem = await localforage
		.getItem(img.name)
		.then(async (response) => {
			let hasItem = response;
			if (hasItem === null) {
				try {
					const imageAnnotations = await getObjectLocalization(img);
					const imageData = { dataURL: img.dataURL, objectAnnotations: imageAnnotations.responses };
					const settingResponse = await localforage.setItem(img.name, imageData);
					hasItem = true;
					console.log(settingResponse);
				} catch (error) {
					throw new Error(error);
				}
			}
			return hasItem;
		})
		.catch((error) => {
			throw new Error(`Something went wrong, ${error}`);
		});

	sessionStorage.setItem("response", JSON.stringify({ process: img.name, hasItem: hasItem }));
	return redirect(`imgine/response`);
}

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const schema = Yup.object().shape({
	image: Yup.mixed()
		.nullable()
		.required("A file is required")
		.test("File size", "File size is too big", (value) => !value || (value && value.size <= 1024 * 1024))
		.test("Format", "Invalid file format", (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
});

export default function FormImgine(props) {
	const submit = useSubmit();
	const navigation = useNavigation();
	return (
		<Formik
			enableReinitialize={true}
			validationSchema={schema}
			onSubmit={async (values) => {
				const reader = new FileReader();
				reader.addEventListener("load", () => {
					const image = { name: values.image.name, dataURL: reader.result };
					submit(image, { method: "post" });
				});
				reader.readAsDataURL(values.image);
			}}
			initialValues={{
				image: null,
			}}
		>
			{(props) => (
				<Form noValidate onSubmit={props.handleSubmit}>
					<Form.Group controlId="img">
						<Form.Label>Upload an image</Form.Label>
						<Form.Control
							type="file"
							accept=".jpg, .jpeg, .png"
							onChange={(event) => {
								const img = event.currentTarget.files[0];
								props.setFieldValue("image", img);
							}}
							isValid={props.touched.image && !props.errors.image}
							isInvalid={props.errors.image}
						></Form.Control>
						<Form.Text id="img">Only .jpg,.jpeg,.png are allowed. Max 1MB file size.</Form.Text>
						<Form.Control.Feedback type="invalid">{props.errors.image}</Form.Control.Feedback>
						<Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Row>
						<Stack direction="horizontal" gap={2} className="gy-3 justify-content-start">
							<Button
								variant="secondary"
								//type="reset"
								onClick={() => {
									console.log(props);
									//props.resetForm({ image: null });
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
