import ProductCard from "./ProductCard";

const RelatedProduct = ({ relatedProducts }) => {
  return (
    <div className="mt-16 text-3xl font-medium text-left text-gray-700">
      <p className="mb-4 uppercase">| Related Products</p>
      {relatedProducts && relatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
          {relatedProducts.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      ) : (
        <div className="text-xl italic text-gray-500">
          No related products found.
        </div>
      )}
    </div>
  );
};

export default RelatedProduct;
