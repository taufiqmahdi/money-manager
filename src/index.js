import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import ErrorPage from "./pages/ErrorPage";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    // loader: homeLoader,
    children: [
      // {
      //   path: "dashboard",
      //   element: <Home />,
      //   // loader: teamLoader,
      // },
      {
        path: "addactivity",
        element: <AddActivity />,
        // loader: teamLoader,
      },
    ],
  },
  {
    path: "login",
    element: <Home />,
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
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
