import { createSlice } from "@reduxjs/toolkit";

export interface IDoesShowLoginPopupSliceState {
  doesShowLoginPopup: boolean;
};
const initialState: IDoesShowLoginPopupSliceState = {
  doesShowLoginPopup: false,
};

const doesShowLoginPopupSlice = createSlice({
  name: "doesShowLoginPopupSlice",
  initialState,
  reducers: {
    showLoginPopup: state => {
      state.doesShowLoginPopup = true;
    },
    hideLoginPopup: state => {
      state.doesShowLoginPopup = false;
    },
  },
});

export const { showLoginPopup, hideLoginPopup } = doesShowLoginPopupSlice.actions;
export default doesShowLoginPopupSlice.reducer;