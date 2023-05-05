import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "info",
  buttonText: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { message, type, buttonText } = action.payload;
      console.log(action.payload)
      state.message = message;
      state.type = type;
      state.buttonText = buttonText;
    },
    clearAlert: (state) => {
      state.message = "";
      state.type = "info";
      state.buttonText = null;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export const selectAlertMessage = (state) => state.alert.message;
export const selectAlertType = (state) => state.alert.type;
export const selectAlertButtonText = (state) => state.alert.buttonText;


export const alertReducer = alertSlice.reducer;
export default alertSlice;
