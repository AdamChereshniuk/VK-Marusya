import { createSlice } from "@reduxjs/toolkit";

export interface doesShowLoginPopupSliceState {
  doesShowLoginPopup: boolean,
};
const initialState: doesShowLoginPopupSliceState = {
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