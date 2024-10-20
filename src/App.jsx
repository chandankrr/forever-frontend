import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategories } from "./api/fetchCategories";
import { loadCategories } from "./store/features/category";
import { setLoading } from "./store/features/common";
import { getAllProducts } from "./api/fetchProducts";
import { loadProducts } from "./store/features/product";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./layout/ProtectedRoute";
import Checkout from "./pages/Checkout";
import AuthProtectedRoute from "./layout/AuthProtectedRoute";
import ConfirmPayment from "./pages/ConfirmPayment";
import OrderConfirm from "./pages/OrderConfirm";

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
      <Toaster />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<ProductList categoryType="MEN" />} />
          <Route path="/women" element={<ProductList categoryType="WOMEN" />} />
          <Route path="/kids" element={<ProductList categoryType="KIDS" />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/cart-items" element={<Cart />} />
          <Route
            path="/account-details"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirmPayment"
            element={
              <ProtectedRoute>
                <ConfirmPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orderConfirmed"
            element={
              <ProtectedRoute>
                <OrderConfirm />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <AuthProtectedRoute>
                <Login />
              </AuthProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthProtectedRoute>
                <Register />
              </AuthProtectedRoute>
            }
          />
          <Route path="/oauth2/callback" element={<OAuth2LoginCallback />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
