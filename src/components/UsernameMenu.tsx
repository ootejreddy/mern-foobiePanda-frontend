import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useGetCurrentUser } from "@/api/MyUserApi";

const UsernameMenu = () => {
  const { user, logout, isLoading } = useAuth0();
  const { currentUser, isLoading: isLoadingUser } = useGetCurrentUser();
  if (isLoading || isLoadingUser) {
    return <div>is loading...</div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center font-bold hover:text-orange-500 gap-2 px-3">
        {currentUser?.role} {user?.email}
        <CircleUserRound className="text-orange-500 size-10"></CircleUserRound>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 ml-20">
        {currentUser?.role === "ADMIN" && (
          <DropdownMenuItem className="py-4">
            <Link
              to={"/getAllRestaurants"}
              className="font-bold hover:text-orange-500"
            >
              Manage Restaurants
            </Link>
          </DropdownMenuItem>
        )}
        <Separator></Separator>
        <DropdownMenuItem className="py-4">
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-500"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator></Separator>
        {currentUser?.role === "ADMIN" && (
          <DropdownMenuItem className="py-4">
            <Link
              to={"/createRestaurant"}
              className="font-bold hover:text-orange-500"
            >
              Create Restaurant
            </Link>
          </DropdownMenuItem>
        )}
        <Separator></Separator>
        <DropdownMenuItem className="py-4">
          <Button
            className="flex flex-1 font-bold bg-orange-500"
            onClick={async () => {
              sessionStorage.clear();
              await logout({
                logoutParams: { returnTo: window.location.origin },
              });
            }}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
