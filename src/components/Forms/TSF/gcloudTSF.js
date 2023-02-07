import { apiKey } from "../../../../secret/gcloud";
export const url = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=" + apiKey;

export const buildRequestBody = (textContent) => {
	return JSON.stringify({
		document: {
			type: "PLAIN_TEXT",
			content: textContent,
		},
		encodingType: "UTF8",
	});
};

export const buildRequest = (textContent) => {
	return {
		method: "POST",
		body: buildRequestBody(textContent),
		Headers: {
			"Content-Type": "application/json",
		},
	};
};
