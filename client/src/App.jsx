import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MoneyPage from "./pages/MoneyPage";
import MoneyDetailPage from "./pages/MoneyDetailPage";
import AddMoneyPage from "./pages/AddMoneyPage";
import ErrorPage from "./pages/ErrorPage";
import SettingPage from "./pages/SettingPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "money",
          element: <MoneyPage />,
          children: [
            { path: ":id", element: <MoneyDetailPage /> },
            { path: "add-money", element: <AddMoneyPage /> },
          ],
        },
        { path: "setting", element: <SettingPage /> },
      ],
    },
    { path: "/auth", element: <AuthPage /> },
  ]);

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
