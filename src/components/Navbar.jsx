import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { UserRound } from "lucide-react";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-20 gap-40 px-16 bg-white border-b border-gray-200">
      {/* logo */}
      <Link className="gap-8 text-3xl font-semibold text-black" to="/">
        <img src={logo} className="w-36 " alt="logo" />
      </Link>

      {/* nav items */}
      <ul className="flex text-gray-700 gap-14">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>SHOP</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/men" className="flex flex-col items-center gap-1">
          <p>MEN</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/women" className="flex flex-col items-center gap-1">
          <p>WOMEN</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/kids" className="flex flex-col items-center gap-1">
          <p>KIDS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* search bar */}
      <div className="flex items-center justify-center px-4 border rounded">
        <Search className="text-gray-400 size-5" />
        <input
          className="px-4 py-1 outline-none"
          type="text"
          placeholder="Search"
        />
      </div>

      {/* action items */}
      <div className="flex items-center gap-8">
        <Link className="relative cursor-pointer" to="/wishlist">
          <Heart className="text-gray-700 size-6" />
          <div className="absolute flex items-center justify-center rounded-full -top-2 -right-2 size-5 bg-primary">
            <p className="text-xs text-white">10</p>
          </div>
        </Link>
        <Link className="relative cursor-pointer" to="/cart">
          <ShoppingCart className="text-gray-700 size-6" />
          <div className="absolute flex items-center justify-center rounded-full -top-2 -right-2 size-5 bg-primary">
            <p className="text-xs text-white">2</p>
          </div>
        </Link>
        <Link to="/profile">
          <UserRound className="text-gray-700 size-6" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
