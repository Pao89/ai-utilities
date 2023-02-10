import { createSlice } from "@reduxjs/toolkit";

const selectedCanvasInitial = {
	mid: null,
	name: null,
};

const imgineSlice = createSlice({
	name: "imgine",
	initialState: {
		selectedCanvas: { ...selectedCanvasInitial },
	},
	reducers: {
		setSelectedCanvas(state, action) {
			const newCanvas = action.payload;
			if (newCanvas) {
				state.selectedCanvas.mid = newCanvas.mid;
				state.selectedCanvas.name = newCanvas.name;
			} else {
				state.selectedCanvas.mid = selectedCanvasInitial.mid;
				state.selectedCanvas.name = selectedCanvasInitial.name;
			}
			sessionStorage.setItem("selectedCanvas", JSON.stringify(state.selectedCanvas));
		},
	},
});

export async function cropImg(id) {}

export const imgineActions = imgineSlice.actions;
export default imgineSlice;
