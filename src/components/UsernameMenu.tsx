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

const UsernameMenu = () => {
  const { user, logout, isLoading } = useAuth0();
  if (isLoading) {
    return <div>is loading...</div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center font-bold hover:text-orange-500 gap-2 px-3">
        {user?.email}
        <CircleUserRound className="text-orange-500 size-10"></CircleUserRound>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-4 ml-20">
        <DropdownMenuItem className="py-4">
          <Link
            to={"/manage-restaurant"}
            className="font-bold hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-4">
          <Link
            to={"/user-profile"}
            className="font-bold hover:text-orange-500"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator></Separator>
        <DropdownMenuItem className="py-4">
          <Button
            className="flex flex-1 font-bold bg-orange-500"
            onClick={async () =>
              await logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
