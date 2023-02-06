//TABS
export const home = "home";
export const textSentimentFeedback = "text-sentiment-feedback";

//HEADERS
const homeHeader = { title: "AI-Utilities", subtitle: "Bringing various AI utilities at your fingertips." };
const textSentimentHeader = { title: "Text/sentiment/feedback", subtitle: "Get an AI's quick feedback on a piece of text" };

//INTROTEXTCONTENT
const homeIntroTextContent = "To quickly get started, select one of the utilities listed in the navigation bar.";
const textSentimentIntroContent = "Paste inside the area below the text you want the AI to analyze. It will give you one of three feedbacks.";

export const headers = new Map([
	[home, homeHeader],
	[textSentimentFeedback, textSentimentHeader],
]);

export const introTexts = new Map([
	[home, homeIntroTextContent],
	[textSentimentFeedback, textSentimentIntroContent],
]);
