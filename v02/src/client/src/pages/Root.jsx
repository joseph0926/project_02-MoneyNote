import React from "react";
import { useSelector } from "react-redux";
import { Outlet, redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Sidebar from "../components/UI/Sidebar";
import { GlobalStyles, lightTheme, darkTheme } from "../helpers/ThemeConfig";
import Navbar from "../components/UI/Navbar";
import { getUserFromLocalStorage } from "../components/Helpers/localStorage";
import styled from "styled-components";

const Root = () => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Wrapper>
        <main className="sidebar">
          <Sidebar />
        </main>
        <Navbar />
        <div className="main">
          <Outlet />
        </div>
      </Wrapper>
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

const Wrapper = styled.section`
  .sidebar {
    position: absolute;
    top: 5rem;
  }
  .main {
    height: calc(100vh - 5rem);
    width: calc(100vw - 250px);
    position: absolute;
    left: 250px;
  }
  @media only screen and (max-width: 620px) {
    .sidebar {
      top: 3rem;
    }
    .main {
      left: 0;
      width: 100vw;
    }
  }
`;

export default Root;
