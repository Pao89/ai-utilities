import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import ImgineBoundingBox from "./ImgineBoundingBox";

function getBoxArea(vertices) {
	const xVertices = vertices.map((vertice) => vertice.x);
	const yVertices = vertices.map((vertice) => vertice.y);

	const left = Math.min(...xVertices);
	const top = Math.min(...yVertices);
	const right = Math.max(...xVertices);
	const bottom = Math.max(...yVertices);

	return (right - left) * (bottom - top);
}

function compareAreas(one, two) {
	const areaOne = getBoxArea(one.boundingPoly.normalizedVertices);
	const areaTwo = getBoxArea(two.boundingPoly.normalizedVertices);
	if (areaOne < areaTwo) {
		return 1;
	} else if (areaOne > areaTwo) {
		return -1;
	}
	return 0;
}

export default function ImgineCropper(props) {
	const [imgProps, setImgProps] = useState({
		width: null,
		height: null,
	});
	const imageReference = useRef(null);
	const boundingBoxContainer = useRef(null);
	const data = props.data;
	const localizedObjectAnnotations = data.objectAnnotations
		.map((response) => response.localizedObjectAnnotations.map((objAnnotation) => objAnnotation))
		.flat();
	const sortedAnnotationsByLargest = localizedObjectAnnotations.sort(compareAreas);

	const handleWindowSizeChange = () => {
		//update img real size
		const img = imageReference?.current || {};
		const { offsetWidth, offsetHeight } = img;
		setImgProps({ width: offsetWidth, height: offsetHeight });
	};

	const debouncedWindowHandler = debounce(handleWindowSizeChange, 200);

	useEffect(() => {
		window.addEventListener("resize", debouncedWindowHandler);
		return () => {
			window.removeEventListener("resize", debouncedWindowHandler);
		};
	}, []);

	return (
		<React.Fragment>
			<div style={{ position: "relative" }} ref={boundingBoxContainer} className={props.className}>
				{data &&
					sortedAnnotationsByLargest.map((objAnnotation, index) => {
						return (
							<ImgineBoundingBox
								key={index}
								zIndex={index}
								container={boundingBoxContainer}
								referenceImg={imgProps}
								localizedObjectAnnotation={objAnnotation}
							/>
						);
						//z-index is lower for bigger objects, this way i can make smaller ones selectable if they are within
					})}
				<Image src={data.dataURL} ref={imageReference} onLoad={handleWindowSizeChange} fluid={true}></Image>
			</div>
		</React.Fragment>
	);
}
