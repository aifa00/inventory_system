import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sidebarReducer from "./sidebarSlice";
import dialogReducer from "./dialogSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
