/* import { createSlice } from "@reduxjs/toolkit";


const initialFormState = {
	textArea: null,
	valid: false,
};

const formTSFSlice = createSlice({
	name: "formTSF",
	initialState: initialFormState,
	reducers: {
		reset: () => initialFormState,
		updateTextSentimentFeedback(state, action) {
			const textArea = action.payload;
			state.textArea = textArea;
			state.valid = textArea.length >= 50 ? true : false;
		},
	},
});

export const handleFormSubmission = function (form) {
	//running request based on formFields sent and currently selected tab
	return (dispatch) => {
		const { textArea } = form;
		if (!textArea) return;
		console.log(textArea);
	};
};

export const formTSFSliceActions = formTSFSlice.actions;
export default formTSFSlice;
 */
