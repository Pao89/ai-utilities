import { createSlice } from "@reduxjs/toolkit";
import { headers, home, introTexts } from "./ui-content";

const uiSlice = createSlice({
	name: "ui",
	initialState: { tab: home, headerContent: null, introText: null },
	reducers: {
		updateTab(state, action) {
			const newTab = action.payload;
			state.tab = newTab;
		},
		updateHeaderContent(state) {
			state.headerContent = headers.get(state.tab);
		},
		updateIntroText(state) {
			state.introText = introTexts.get(state.tab);
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice;
