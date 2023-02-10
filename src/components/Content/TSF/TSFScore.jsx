import React from "react";

const parseScoreClass = (score) => {
	let className;
	if (score <= -0.3) {
		className = "text-warning";
	} else if (-0.3 < score && score <= -0.1) {
		className = "text-danger";
	} else if (-0.1 < score && score < 0.1) {
		className = "text-info";
	} else if (0.1 <= score && score < 0.3) {
		className = "text-primary";
	} else if (score >= 0.3) {
		className = "text-success";
	}
	return className;
};

export default function TSFScore(props) {
	const score = props.score;
	const color = parseScoreClass(score);
	return <span className={color}>{score}</span>;
}
