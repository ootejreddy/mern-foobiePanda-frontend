import { Link } from "react-router-dom";

import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className=" border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-3xl tracking-tight text-blue-500"
        >
          foodOrder 🥗.com
        </Link>
        <div className="md:hidden">
          <MobileNav></MobileNav>
        </div>
        <div className="hidden md:block">
          <MainNav></MainNav>
        </div>
      </div>
    </div>
  );
};

export default Header;
