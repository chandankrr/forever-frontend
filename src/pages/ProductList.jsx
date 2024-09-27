import { useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import CatergoryFilter from "../components/CatergoryFilter";
import PriceSlider from "../components/PriceSlider";
import category from "../data/category.json";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";

const ProductList = ({ categoryType }) => {
  const categoryContent = useMemo(() => {
    return category?.categories?.find(
      (category) => category.code === categoryType
    );
  }, [categoryType]);

  return (
    <div className="flex gap-10 mt-24">
      {/* filters */}
      <div className="w-1/4 p-2 mt-5 border">
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

      {/* product listing */}
      <div className="w-full mt-5">
        <h1 className="text-3xl font-medium text-left text-gray-700 uppercase">
          | {categoryContent.description}
        </h1>
      </div>
    </div>
  );
};

export default ProductList;
