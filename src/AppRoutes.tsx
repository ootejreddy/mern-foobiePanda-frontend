import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestuarantPage from "./pages/ManageRestuarantPage";
import { SearchPage } from "./pages/SearchPage";
import RestaurantDetailPage from "./pages/RestaurantDetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import { ListOfAllRestaurantPage } from "./pages/ListOfAllRestaurantPage";

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
      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestuarantPage />
            </Layout>
          }
        />
        <Route
          path="/getAllRestaurants"
          element={
            <Layout>
              <ListOfAllRestaurantPage />
            </Layout>
          }
        />
      </Route>
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
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
      </Route>

      <Route
        path="/auth-callback"
        element={<AuthCallbackPage></AuthCallbackPage>}
      />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <RestaurantDetailPage />
          </Layout>
        }
      />

      <Route path="/*" element={<Navigate to="/"></Navigate>} />
    </Routes>
  );
};

export default AppRoutes;
