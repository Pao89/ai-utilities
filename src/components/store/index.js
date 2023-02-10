import { configureStore } from "@reduxjs/toolkit";
import imgineSlice from "./imgine-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
	reducer: { ui: uiSlice.reducer, imgine: imgineSlice.reducer },
});

export default store;
