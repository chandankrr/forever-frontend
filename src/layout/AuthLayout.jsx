import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div>
    <Navbar defaultNavbar={false} />
    <Outlet />
  </div>
);

export default AuthLayout;
