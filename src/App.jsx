import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";

const App = () => {
  return (
    <div className="px-16">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<ProductList categoryType="MEN" />} />
        <Route path="/women" element={<ProductList categoryType="WOMEN" />} />
        <Route path="/kids" element={<ProductList categoryType="KIDS" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
