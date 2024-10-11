import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { UserRound } from "lucide-react";
import { countCartItems } from "../store/features/cart";
import { isTokenValid } from "../utils/jwtHelper";
import logo from "../assets/images/logo.png";

const Navbar = ({ defaultNavbar = true }) => {
  const navigate = useNavigate();

  const cartLength = useSelector(countCartItems);

  const handleClick = () => {
    if (isTokenValid()) {
      navigate("/account-details");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 flex items-center justify-between h-20 gap-40 px-16 bg-white border-b border-gray-200"
      style={{
        zIndex: "100000",
      }}
    >
      {/* logo */}
      <Link className="gap-8 text-3xl font-semibold text-black" to="/">
        <img src={logo} className="max-w-40 " alt="logo" />
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
        <Link className="relative cursor-pointer" to="/cart-items">
          <ShoppingCart className="text-gray-700 size-6" />
          {cartLength > 0 && (
            <div className="absolute flex items-center justify-center rounded-full -top-2 -right-2 size-5 bg-primary">
              <p className="text-xs text-white">{cartLength}</p>
            </div>
          )}
        </Link>
        {defaultNavbar && (
          <div className="cursor-pointer" onClick={handleClick}>
            <UserRound className="text-gray-700 size-6" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
