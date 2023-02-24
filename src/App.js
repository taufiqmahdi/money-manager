import Dashboard from "./pages/Dashboard/Dashboard";
import AddActivity from "./pages/Dashboard/Features/AddActivity";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import MainPage from "./pages/Dashboard/MainPage";
import Profile from "./pages/Dashboard/Profile/Profile";
import LoginNew from "./pages/Login";
import RequireAuth from "./pages/Dashboard/Authentication/RequireAuth";
import EditProfileModal from "./pages/Modal/EditProfileModal";
import Cashflow from "./pages/Dashboard/Cashflow/Cashflow";

function App() {
  const router = createBrowserRouter([
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
              children: [
                {
                  index: true,
                  element: <EditProfileModal />,
                },
              ],
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
