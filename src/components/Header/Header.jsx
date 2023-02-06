import React, { useEffect } from "react";
import { Stack, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import classes from "./Header.module.scss";

export const Header = function (props) {
	return (
		<Row>
			<Stack className="gy-5" gap={2}>
				<h1 className={classes.header}>{props?.title}</h1>
				<p className="lead">{props?.subtitle}</p>
			</Stack>
		</Row>
	);
};

export default Header;
