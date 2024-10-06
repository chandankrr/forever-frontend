import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./api/fetchCategories";
import { loadCategories } from "./store/features/category";
import { setLoading } from "./store/features/common";
import { getAllProducts } from "./api/fetchProducts";
import { loadProducts } from "./store/features/product";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";

const MainLayout = () => (
  <div className="px-16">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

const AuthLayout = () => (
  <div>
    <Navbar defaultNavbar={false} />
    <Outlet />
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndLoadCategories = async () => {
      try {
        dispatch(setLoading(true));
        const res = await fetchCategories();
        dispatch(loadCategories(res));
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndLoadCategories();
  }, [dispatch]);

  useEffect(() => {
    const fetchAndLoadAllProducts = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getAllProducts();
        dispatch(loadProducts(res));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndLoadAllProducts();
  }, [dispatch]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<ProductList categoryType="MEN" />} />
          <Route path="/women" element={<ProductList categoryType="WOMEN" />} />
          <Route path="/kids" element={<ProductList categoryType="KIDS" />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/callback" element={<OAuth2LoginCallback />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
