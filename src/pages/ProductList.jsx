import { useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import CatergoryFilter from "../components/CatergoryFilter";
import PriceSlider from "../components/PriceSlider";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";
import category from "../data/category.json";
import product from "../data/product.json";
import ProductCard from "../components/ProductCard";

const ProductList = ({ categoryType }) => {
  const categoryContent = useMemo(() => {
    return category?.categories?.find(
      (category) => category.code === categoryType
    );
  }, [categoryType]);

  const productListItems = useMemo(() => {
    return product?.products?.filter(
      (product) => product?.category_id === categoryContent?.id
    );
  }, [categoryContent]);

  return (
    <div className="flex flex-col gap-10 mt-24 sm:flex-row">
      {/* filters */}
      <div className="w-1/5">
        <div className="inline-block p-2 mt-5 border">
          <div className="flex items-center justify-between border-b">
            <p className="text-xl font-medium">FILTERS</p>
            <SlidersHorizontal className="size-4" />
          </div>

          <div className="pl-2">
            {/* category types */}
            <CatergoryFilter categoryType={categoryContent?.types} />

            {/* price slider */}
            <PriceSlider />

            {/* size selector */}
            <SizeSelector sizes={categoryContent?.meta_data?.sizes} />

            {/* colors selector */}
            <ColorSelector colors={categoryContent?.meta_data?.colors} />
          </div>
        </div>
      </div>

      {/* product listing */}
      <div className="flex-1 mt-5">
        <div className="flex items-baseline justify-between">
          <h1 className="text-3xl font-medium text-left text-gray-700 uppercase">
            | {categoryContent.description}
          </h1>
          <div className="flex gap-4">
            <p className="text-base cursor-pointer text-primary">New</p>
            <span>|</span>
            <p className="text-base text-gray-600 cursor-pointer">
              Recommended
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {productListItems?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
