import React from "react";
import { useSelector } from "react-redux";
import { Outlet, redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Sidebar from "../components/UI/Sidebar";
import { GlobalStyles, lightTheme, darkTheme } from "../helpers/ThemeConfig";
import Navbar from "../components/UI/Navbar";
import { getUserFromLocalStorage } from "../components/Helpers/localStorage";

const Root = () => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar />
      <Sidebar />
      <Outlet />
    </ThemeProvider>
  );
};

export async function loader() {
  const token = await getUserFromLocalStorage();
  if (!token) {
    return redirect("/land");
  }
  return null;
}

export default Root;
