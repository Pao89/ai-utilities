import React, { useRef, useState } from "react";
import { Overlay, Popover } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { imgineActions } from "../../store/imgine-slice";
import "./ImgineBoundingBox.scss";

function createBoundingBoxStyle(originalImg, normalizedVertices) {
	const { width, height } = originalImg;

	const xVertices = normalizedVertices.map((vertice) => vertice.x * width);
	const yVertices = normalizedVertices.map((vertice) => vertice.y * height);

	const left = Math.min(...xVertices);
	const top = Math.min(...yVertices);
	const right = Math.max(...xVertices);
	const bottom = Math.max(...yVertices);

	return { top: top, left: left, width: right - left, height: bottom - top };
}

export default function ImgineBoundingBox(props) {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const boundingBox = useRef(null);

	const localizedObject = props.localizedObjectAnnotation;
	const referenceImg = props.referenceImg;
	const boundingBoxContainer = props.container;

	const { left, top, width, height } = createBoundingBoxStyle(referenceImg, localizedObject.boundingPoly.normalizedVertices);

	const handleClickTooltip = () => {
		setShow((prevShow) => {
			return !prevShow;
		});
		if (show) {
			dispatch(imgineActions.setSelectedCanvas({ mid: localizedObject.mid, name: localizedObject.name, score: localizedObject.score }));
		}
	};

	const style = {
		position: "absolute",
		top: `${top}px`,
		left: `${left}px`,
		height: `${height}px`,
		width: `${width}px`,
		zIndex: `${props.zIndex}`,
	};

	return (
		<div
			style={style}
			className="imgine-bounding-box"
			ref={boundingBox}
			onClick={handleClickTooltip}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			<Overlay show={show} container={boundingBoxContainer} placement="top" target={boundingBox} containerPadding={2}>
				<Popover id="popover-contained" style={{ zIndex: "9999 !important" }}>
					<Popover.Header as="h3">{localizedObject.name}</Popover.Header>
					<Popover.Body>
						<strong>Accuracy:</strong> {(localizedObject.score * 100).toFixed(2)}%
					</Popover.Body>
				</Popover>
			</Overlay>
		</div>
	);
}
