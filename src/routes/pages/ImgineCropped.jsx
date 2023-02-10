import localforage from "localforage";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import StandardHeader from "../../components/Header/StandardHeader";
import store from "../../components/store";

const key = "imgine-cropped";

async function crop(originalImg, vertices) {
	const response = await fetch("http://localhost:3000/crop", {
		method: "POST",
		body: JSON.stringify({
			image: originalImg,
			vertices: vertices,
		}),
		headers: {
			"Content-Type": "Application/json",
		},
	});
	return response.json();
}

async function saveCrop(imageName, cropRecord) {
	return localforage.getItem(imageName).then((record) => {
		const crops = record.crops ? { ...record.crops } : {};
		const id = `${cropRecord.mid}-${cropRecord.score}}`;
		crops[id] = cropRecord;
		const newRecord = { ...record, crops: { ...crops } };
		localforage.setItem(imageName, newRecord);
	});
}

function getCropInfo() {
	const {
		imgine: { selectedCanvas },
	} = store.getState();
	const processedImg = JSON.parse(sessionStorage.getItem("response"));
	if (!selectedCanvas.mid === null) return [selectedCanvas, processedImg];

	//fallback to sessionStorage for canvas in case store got refreshed
	const sessionCanvas = JSON.parse(sessionStorage.getItem("selectedCanvas"));
	return [sessionCanvas, processedImg];
}

export async function loadCrop() {
	const [selectedCanvas, processedImg] = getCropInfo();
	if (!(selectedCanvas?.mid && processedImg)) throw new Error("You haven't selected an image/cropped one");
	const imgName = await localforage.key(processedImg.key);
	const record = await localforage.getItem(imgName);
	const id = `${selectedCanvas.mid}-${selectedCanvas.score}}`;
	//check if i saved this crop before processing it
	if (record.crops?.hasOwnProperty(id)) {
		return { image: record.crops[id].image };
	}

	const { dataURL } = record;
	const objectAnnotations = record.objectAnnotations.map((item) => Array.from(item.localizedObjectAnnotations)).flat();
	const selectedAnnotaion = objectAnnotations.find(
		(annotation) => annotation.mid == selectedCanvas.mid && annotation.score == selectedCanvas.score
	);
	const { image } = await crop(dataURL, selectedAnnotaion.boundingPoly.normalizedVertices);
	saveCrop(imgName, { mid: selectedAnnotaion.mid, crop: image, score: selectedAnnotaion.score });
	return { image: image };
}

export default function ImgineCropped(props) {
	const { image } = useLoaderData();
	return (
		<React.Fragment>
			<StandardHeader dictionaryKey={key} />
			<Row>
				<Col>
					<img src={image}></img>
				</Col>
			</Row>
		</React.Fragment>
	);
}
