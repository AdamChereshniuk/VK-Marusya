import { createSlice } from "@reduxjs/toolkit";

export interface doesShowRegisterPopupSliceState {
  doesShowRegisterPopup: boolean,
};
const initialState: doesShowRegisterPopupSliceState = {
  doesShowRegisterPopup: false,
};

const doesShowRegisterPopupSlice = createSlice({
    name: "doesShowLoginPopupSlice",
    initialState,
    reducers: {
      showRegisterPopup: state => {
        state.doesShowRegisterPopup = true;
      },
      hideRegisterPopup: state => {
        state.doesShowRegisterPopup = false;
      },
    },
});

export const { showRegisterPopup, hideRegisterPopup } = doesShowRegisterPopupSlice.actions;
export default doesShowRegisterPopupSlice.reducer;