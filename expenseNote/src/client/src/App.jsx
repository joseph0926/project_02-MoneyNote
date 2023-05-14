import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Root, { loader as protectRouteLoader } from "./pages/Root";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MoneyPage from "./pages/MoneyPage";
import MoneyDetailPage from "./pages/MoneyDetailPage";
import AddMoneyPage from "./pages/AddMoneyPage";
import ErrorPage from "./pages/ErrorPage";
import SettingPage from "./pages/SettingPage";
import StatsPage from "./pages/StatsPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: protectRouteLoader,
      children: [
        { index: true, element: <StatsPage /> },
        { path: "setting", element: <SettingPage /> },
        {
          path: "money",
          element: <MoneyPage />,
        },
        { path: "money/add-money", element: <AddMoneyPage /> },
      ],
    },
    { path: "/auth", element: <AuthPage /> },
    { path: "/land", element: <HomePage /> },
  ]);

  return (
    <>
      <ToastContainer position="top-center" style={{ width: "auto" }} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
