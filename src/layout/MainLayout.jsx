import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => (
  <div className="px-16">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

export default MainLayout;
