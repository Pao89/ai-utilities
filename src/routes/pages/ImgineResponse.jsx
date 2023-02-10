import React from "react";
import { Button, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import ImgineCropper from "../../components/Content/Imgine/ImgineCropper";
import StandardHeader from "../../components/Header/StandardHeader";
import { imgineResponse } from "../../components/store/ui-content";

const key = imgineResponse;

export default function ImgineResponse(props) {
	const dispatch = useDispatch();
	const data = useLoaderData();
	const selectedCanvas = useSelector((state) => state.imgine.selectedCanvas);

	return (
		<React.Fragment>
			<StandardHeader dictionaryKey={key} />
			<Row>
				<Stack className="col align-items-center gy-3 mb-5">
					<div className="d-flex flex-column gap-3 p-2">
						{!selectedCanvas.name && <h5 className="m-0">Click a box to proceed</h5>}
						{selectedCanvas?.name && (
							<h5 className="m-0">
								Selected: <span className="fst-italic">{selectedCanvas.name}</span>
							</h5>
						)}
						<ImgineCropper data={data}></ImgineCropper>
						{selectedCanvas?.name && (
							<Link to="/imgine/cropped" className="align-self-end">
								<Button>Crop</Button>
							</Link>
						)}
					</div>
				</Stack>
			</Row>
		</React.Fragment>
	);
}
