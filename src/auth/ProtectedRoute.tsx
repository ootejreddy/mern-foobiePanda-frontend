import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("Is authenticated from protected route is: ", isAuthenticated);
  if (isLoading) {
    return <div>isLoading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
