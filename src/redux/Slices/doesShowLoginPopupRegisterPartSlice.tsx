import { createSlice } from "@reduxjs/toolkit";

export interface doesShowLoginPopupRegisterPart {
  doesShowLoginPopupRegisterPart: boolean,
};
const initialState: doesShowLoginPopupRegisterPart = {
  doesShowLoginPopupRegisterPart: false,
};

const doesShowLoginPopupRegisterPartSlice = createSlice({
    name: "doesShowLoginPopupRegisterPartSlice",
    initialState,
    reducers: {
      showLoginPopupRegisterPart: state => {
        state.doesShowLoginPopupRegisterPart = true;
      },
      hideLoginPopupRegisterPart: state => {
        state.doesShowLoginPopupRegisterPart = false;
      },
    },
});

export const { showLoginPopupRegisterPart, hideLoginPopupRegisterPart } = doesShowLoginPopupRegisterPartSlice.actions;
export default doesShowLoginPopupRegisterPartSlice.reducer;