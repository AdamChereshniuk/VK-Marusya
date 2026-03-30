import { configureStore } from "@reduxjs/toolkit";
import doesShowLoginPopupSlice from "./Slices/doesShowLoginPopupSlice";
import doesShowRegisterPopupSlice from "./Slices/doesShowRegisterPopupSlice";
import doesShowLoginPopupLoginPartSlice from "./Slices/doesShowLoginPopupLoginPartSlice";
import doesShowLoginPopupRegisterPartSlice from "./Slices/doesShowLoginPopupRegisterPartSlice";

export const store = configureStore({
    reducer: {
        showLoginPopup: doesShowLoginPopupSlice,
        showRegister: doesShowRegisterPopupSlice,
        showLoginPopupLoginPart: doesShowLoginPopupLoginPartSlice,
        showLoginPopupRegisterPart: doesShowLoginPopupRegisterPartSlice,
    },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];