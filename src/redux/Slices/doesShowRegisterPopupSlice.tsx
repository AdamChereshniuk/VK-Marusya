import { createSlice } from "@reduxjs/toolkit";

export interface IDoesShowRegisterPopupSliceState {
  doesShowRegisterPopup: boolean;
};
const initialState: IDoesShowRegisterPopupSliceState = {
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
      state.doesShowRegisterPopup = false
    },
  },
});

export const { showRegisterPopup, hideRegisterPopup } = doesShowRegisterPopupSlice.actions;
export default doesShowRegisterPopupSlice.reducer;