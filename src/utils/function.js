export const calculateOriginalPrice = (discountedPrice, discountPercentage) => {
  const discountDecimal = discountPercentage / 100;
  const originalPrice = discountedPrice / (1 - discountDecimal);
  return Math.round(originalPrice * 100) / 100;
};
