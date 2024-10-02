import ProductCard from "./ProductCard";

const LatestCollection = ({ latestProducts }) => {
  return (
    <div className="my-10">
      {/* latest collection */}
      <div className="py-8 text-3xl text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <p className="font-medium text-gray-700">LATEST COLLECTIONS</p>
        </div>
        <p className="w-3/4 m-auto text-base text-gray-600">
          Explore Our Latest Collection and Embrace the Freshest Trends of the
          Season
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
        {latestProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
