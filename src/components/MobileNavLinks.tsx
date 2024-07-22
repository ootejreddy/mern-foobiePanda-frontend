import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "./ui/separator";
import { useGetCurrentUser } from "@/api/MyUserApi";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const { currentUser, isLoading: isLoadingUser } = useGetCurrentUser();
  if (isLoadingUser) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Order Status
      </Link>
      {currentUser?.role === "ADMIN" && (
        <Link
          to="/getAllRestaurants"
          className="flex bg-white items-center font-bold hover:text-orange-500"
        >
          Manage Restaurants
        </Link>
      )}

      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Separator />
      <Button
        className="flex items-center px-3 font-bold hover:bg-gray-500"
        onClick={async () => await logout()}
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
