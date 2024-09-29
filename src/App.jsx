import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div className="px-16">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<ProductList categoryType="MEN" />} />
        <Route path="/women" element={<ProductList categoryType="WOMEN" />} />
        <Route path="/kids" element={<ProductList categoryType="KIDS" />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
