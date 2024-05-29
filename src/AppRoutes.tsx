import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestuarantPage from "./pages/ManageRestuarantPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <Homepage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestuarantPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/auth-callback"
        element={<AuthCallbackPage></AuthCallbackPage>}
      />
      <Route path="*" element={<Navigate to="/"></Navigate>} />
    </Routes>
  );
};

export default AppRoutes;
