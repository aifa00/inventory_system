import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  message: "",
  onCancel: undefined,
  onSuccess: undefined,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.onCancel = action.payload.onCancel;
      state.onSuccess = action.payload.onSuccess;
    },
    closeDialog: () => initialState,
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
