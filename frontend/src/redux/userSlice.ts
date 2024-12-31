import { createSlice } from "@reduxjs/toolkit";

const initialState = { isUser: false, email: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isUser = action.payload.isUser;
      state.email = action.payload.email;
    },
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
