import product from "../data/product.json";

export const loadProductById = (productId) => {
  productId = Number(productId);

  const productDetails = product?.products?.find(
    (product) => product.id === productId
  );

  return productDetails;
};

export const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
  const discountDecimal = discountPercentage / 100;
  const originalPrice = discountedPrice / (1 - discountDecimal);
  return Math.round(originalPrice * 100) / 100;
};
