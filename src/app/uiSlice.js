import { createSlice } from "@reduxjs/toolkit/dist";

const initialState = {
  screenSize: undefined,
  currentColor: "#03C9D7",
  currentMode: "Light",
  themeSettings: false,
  activeMenu: true,
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setScreenSize(state, action) {
      state.screenSize = action.payload;
    },
    setCurrentColor(state, action) {
      state.currentColor = action.payload;
      localStorage.setItem("colorMode", action.payload);
    },
    setCurrentMode(state, action) {
      state.currentMode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    setThemeSettings(state, action) {
      state.themeSettings = action.payload;
    },
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
    handelClick(state, action) {
      if (action.payload)
        state.isClicked[action.payload] = !state.isClicked[action.payload];
      else state.isClicked = initialState.isClicked;
    },
  },
});

export const {
  setActiveMenu,
  setCurrentColor,
  setCurrentMode,
  setScreenSize,
  setThemeSettings,
  handelClick,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
export default uiSlice;
