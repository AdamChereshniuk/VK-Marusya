import { createSlice } from "@reduxjs/toolkit";

export interface IDoesShowSuccessRegistrationPopupSliceState {
  doesShowSuccessRegistrationPopup: boolean;
};
const initialState: IDoesShowSuccessRegistrationPopupSliceState = {
  doesShowSuccessRegistrationPopup: false,
};

const doesShowSuccessRegistrationPopupSlice = createSlice({
  name: "doesShowSuccessRegistrationPopupSlice",
  initialState,
  reducers: {
    showSuccessRegistrationPopup: state => {
      state.doesShowSuccessRegistrationPopup = true;
    },
    hideSuccessRegistrationPopup: state => {
      state.doesShowSuccessRegistrationPopup = false;
    },
  },
});

export const { showSuccessRegistrationPopup, hideSuccessRegistrationPopup } = doesShowSuccessRegistrationPopupSlice.actions;
export default doesShowSuccessRegistrationPopupSlice.reducer;