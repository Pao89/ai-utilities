import React from "react";
import StandardHeader from "../../components/Header/StandardHeader";

const key = "home";

export default function Home() {
	return (
		<React.Fragment>
			<StandardHeader dictionaryKey={key} />
		</React.Fragment>
	);
}
