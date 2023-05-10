import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  isLight: false,
  isSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme === "light") {
        state.theme = "dark";
        state.isLight = false;
      } else {
        state.theme = "light";
        state.isLight = true;
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleTheme, toggleSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
