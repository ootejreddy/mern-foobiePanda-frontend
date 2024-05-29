import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "../src/layouts/Layout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRestuarantPage from "./pages/ManageRestuarantPage";
import ProtectedRoute from "./auth/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout showHero>
        <Homepage />
      </Layout>
    ),
  },
  {
    path: "/auth-callback",
    element: <AuthCallbackPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/user-profile",
        element: (
          <Layout>
            <UserProfilePage />
          </Layout>
        ),
      },
      {
        path: "/manage-restaurant",
        element: (
          <Layout>
            <ManageRestuarantPage />
          </Layout>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
