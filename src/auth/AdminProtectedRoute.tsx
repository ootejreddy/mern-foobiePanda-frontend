import { useGetCurrentUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, isLoading: isLoadingUser } = useGetCurrentUser();
  console.log("Is authenticated from protected route is: ", isAuthenticated);
  if (isLoading || isLoadingUser) {
    return <div>isLoading...</div>;
  }

  return isAuthenticated && currentUser?.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default AdminProtectedRoute;
