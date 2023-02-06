import { configureStore } from "@reduxjs/toolkit";
/* import formTSFSlice from "./formTSF-slice"; */
import uiSlice from "./ui-slice";

const store = configureStore({
	reducer: { ui: uiSlice.reducer },
});

export default store;
