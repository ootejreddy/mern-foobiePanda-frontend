import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white font-bold hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        className="flex flex-1 items-center font-bold hover:bg-gray-500 px-3"
        onClick={async () => await logout()}
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
