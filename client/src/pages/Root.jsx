import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/UI/Sidebar";

const Root = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Root;
