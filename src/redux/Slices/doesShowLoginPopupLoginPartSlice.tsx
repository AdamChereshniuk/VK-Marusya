import { createSlice } from "@reduxjs/toolkit";

export interface doesShowLoginPopupLoginPartSliceState {
  doesShowLoginPopupLoginPart: boolean,
};
const initialState: doesShowLoginPopupLoginPartSliceState = {
  doesShowLoginPopupLoginPart: true,
};

const doesShowLoginPopupLoginPartSlice = createSlice({
    name: "doesShowLoginPopupLoginPartSlice",
    initialState,
    reducers: {
      showLoginPopupLoginPart: state => {
        state.doesShowLoginPopupLoginPart = true;
      },
      hideLoginPopupLoginPart: state => {
        state.doesShowLoginPopupLoginPart = false;
      },
    },
});

export const { showLoginPopupLoginPart, hideLoginPopupLoginPart } = doesShowLoginPopupLoginPartSlice.actions;
export default doesShowLoginPopupLoginPartSlice.reducer;