import { configureStore } from "@reduxjs/toolkit";
import doesShowLoginPopupSlice from "./Slices/doesShowLoginPopupSlice";
import doesShowRegisterPopupSlice from "./Slices/doesShowRegisterPopupSlice";
import doesShowSuccessRegistrationPopupSlice from "./Slices/doesShowSuccessRegistrationPopupSlice";

export const store = configureStore({
    reducer: {
        showLoginPopup: doesShowLoginPopupSlice,
        showRegisterPopup: doesShowRegisterPopupSlice,
        showSuccessRegistrationPopup: doesShowSuccessRegistrationPopupSlice,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];