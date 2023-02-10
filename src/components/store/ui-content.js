//TABS
export const home = "home";
export const textSentimentFeedback = "text-sentiment-feedback";
export const imgine = "imgine";
export const imgineResponse = "imgine-response";
export const imgineCropped = "imgine-cropped";

//HEADERS
const homeHeader = { title: "AI-Utilities", subtitle: "Bringing various AI utilities at your fingertips." };
const textSentimentHeader = { title: "Text/sentiment/feedback", subtitle: "Get an AI's quick feedback on a piece of text" };
const imgineHeader = { title: "Imgine", subtitle: "Imagine what img could come out of here" };

//INTROTEXTCONTENT
const homeIntroTextContent = "To quickly get started, select one of the utilities listed in the navigation bar.";
const textSentimentIntroContent = "Paste inside the area below the text you want the AI to analyze. It will give you one of three feedbacks.";
const imgineIntroContent = "Select an image from your computer, upload it, choose the subject, and let the AI work on it.";
const imgineIntroResponse = `Those are the entities/objects detected by Google Cloud's Vision API. Select one of the detected canvases that you wish to
work on. The selected canvas will be cropped, and further operations will be available.`;
const imgineIntroCropped = `This is the subject you chose to crop.`;

export const headers = new Map([
	[home, homeHeader],
	[textSentimentFeedback, textSentimentHeader],
	[imgine, imgineHeader],
	[imgineResponse, imgineHeader],
	[imgineCropped, imgineHeader],
]);

export const introTexts = new Map([
	[home, homeIntroTextContent],
	[textSentimentFeedback, textSentimentIntroContent],
	[imgine, imgineIntroContent],
	[imgineResponse, imgineIntroResponse],
	[imgineCropped, imgineIntroCropped],
]);
