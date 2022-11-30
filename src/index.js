import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Unused/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddActivity from "./pages/Dashboard/Features/AddActivity";
import ErrorPage from "./pages/Error/ErrorPage";
import { ChakraProvider } from "@chakra-ui/react";
import MainPage from "./pages/Dashboard/MainPage";
import LoginNew from "./pages/LandingPage/LoginNew";
import Profile from "./pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    // loader: homeLoader,
    children: [
      {
        index: true,
        // path: "dashboard",
        element: <MainPage />,
        // loader: teamLoader,
      },
      {
        path: "add/:activity",
        element: <AddActivity />,
        // loader: teamLoader,
      },
      {
        path: "profile",
        element: <Profile />,
        // loader: teamLoader,
      },
    ],
  },
  {
    path: "login",
    element: <LoginNew />,
    // loader: teamLoader,
  },
  // {
  //   path: "addactivity",
  //   element: <AddActivity />,
  //   // loader: teamLoader,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <RouterProvider router={router}> */}
        <App />
      {/* </RouterProvider> */}
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
