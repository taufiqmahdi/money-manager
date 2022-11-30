import Dashboard from "./pages/Dashboard/Dashboard";
import AddActivity from "./pages/Dashboard/Features/AddActivity";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error/ErrorPage";
import MainPage from "./pages/Dashboard/MainPage";
import Profile from "./pages/Dashboard/Profile/Profile";
import LoginNew from "./pages/LandingPage/LoginNew";
import RequireAuth from "./pages/Dashboard/Authentication/RequireAuth";
import EditProfileModal from "./pages/Modal/EditProfileModal";
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
              children: [
                {
                  // path: "/",
                  index: true,
                  element: <EditProfileModal />,
                  // loader: teamLoader,
                },
              ],
            },
            {
              path: "cashflow",
              element: <Cashflow />,
              // loader: teamLoader,
            },
          ],
        },
      ],
    },
    {
      path: "login",
      element: <LoginNew />,
      errorElement: <ErrorPage />,
      // loader: <RequireAuth />,
    },
    // {
    //   path: "addactivity",
    //   element: <AddActivity />,
    //   // loader: teamLoader,
    // },
  ]);

  return (
    // <div className="App">
    //   <header
    //   // className="App-header"
    //   >
    //     {/* <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //     {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
    //     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    //     <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"></link> */}
    //   </header>
    //   aasssssssssssssssas
    //   <Home />
    //   {/* <Dashboard /> */}
    //   {/* <AddActivity /> */}
    // </div>
    <RouterProvider router={router} />
  );
}

export default App;
