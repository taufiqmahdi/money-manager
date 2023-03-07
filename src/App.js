import Dashboard from "./pages/Dashboard/Dashboard";
import AddActivity from "./pages/Dashboard/Features/AddActivity";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import MainPage from "./pages/Dashboard/MainPage";
import Profile from "./pages/Dashboard/Profile/Profile";
import LoginNew from "./pages/Login";
import RequireAuth from "./pages/Dashboard/Authentication/RequireAuth";
import Cashflow from "./pages/Dashboard/Cashflow/Cashflow";

function App() {
  const router = createHashRouter([
    {
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <MainPage />,
            },
            {
              path: "add/:activity",
              element: <AddActivity />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "cashflow",
              element: <Cashflow />,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <LoginNew />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
