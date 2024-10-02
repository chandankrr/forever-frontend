import { getProudctBySlug } from "../api/fetchProducts";
import { setLoading } from "../store/features/common";
import store from "../store/store";

export const loadProductBySlug = async (slug) => {
  try {
    store.dispatch(setLoading(true));
    const product = await getProudctBySlug(slug);
    store.dispatch(setLoading(false));
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
  const discountDecimal = discountPercentage / 100;
  const originalPrice = discountedPrice / (1 - discountDecimal);
  return Math.round(originalPrice * 100) / 100;
};
