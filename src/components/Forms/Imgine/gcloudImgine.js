import { apiKey } from "../../../../secret/gcloud";
const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

const buildRequestBody = function (img) {
	return JSON.stringify({
		requests: {
			image: {
				content: img.dataURL.substr(img.dataURL.indexOf("/9j/")), //the api doesn't like anything before /9j/
			},
			features: [
				{
					maxResults: 15,
					type: "OBJECT_LOCALIZATION",
				},
			],
		},
	});
};

const buildRequest = function (img) {
	return {
		method: "POST",
		body: buildRequestBody(img),
		Headers: {
			"Content-Type": "application/json",
		},
	};
};

export async function getObjectLocalization(img) {
	try {
		const response = await fetch(url, buildRequest(img));
		if (!response.ok) throw new Error(response);
		const data = await response.json();
		return data;
	} catch (err) {
		console.error(err);
		throw new Error(`Something went wrong, ${err}`);
	}
}
