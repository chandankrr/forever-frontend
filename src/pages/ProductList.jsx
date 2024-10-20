import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal } from "lucide-react";
import { setLoading } from "../store/features/common.js";
import { getAllProducts } from "../api/fetchProducts.js";
import CatergoryFilter from "../components/CatergoryFilter";
import PriceSlider from "../components/PriceSlider";
import ColorSelector from "../components/ColorSelector";
import SizeSelector from "../components/SizeSelector";
import categoryFilterData from "../data/category.json";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader.jsx";
import productNotFound from "../assets/images/product-not-found.jpg";

const ProductList = ({ categoryType }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryState.categories);
  const isLoading = useSelector((state) => state.commonState.loading);
  const [products, setProducts] = useState([]);

  const categoryContent = useMemo(() => {
    return categoryFilterData?.categories?.find(
      (category) => category.code === categoryType
    );
  }, [categoryType]);

  const category = useMemo(() => {
    return categoryData?.find((element) => element?.code === categoryType);
  }, [categoryData, categoryType]);

  useEffect(() => {
    const fetchAndLoadProducts = async () => {
      if (!category?.id) return;

      try {
        dispatch(setLoading(true));
        const res = await getAllProducts(category.id);
        setProducts(res);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndLoadProducts();
  }, [category?.id, dispatch]);

  return (
    <div className="min-h-[100vh]">
      {isLoading ? (
        <Loader />
      ) : (
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
            {category ? (
              <>
                <div className="flex items-baseline justify-between">
                  <h1 className="text-3xl font-medium text-left text-gray-700 uppercase">
                    | {category?.description}
                  </h1>
                  <div className="flex gap-4">
                    <p className="text-base cursor-pointer text-[#c586a5]">
                      New
                    </p>
                    <span>|</span>
                    <p className="text-base text-gray-600 cursor-pointer">
                      Recommended
                    </p>
                  </div>
                </div>

                {/* Show "No Product Found" if products array is empty */}
                {products.length === 0 ? (
                  <div className="flex items-center justify-center h-[70%]">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        className="w-[300px] h-[300px] object-contain"
                        src={productNotFound}
                        alt="Product not found"
                      />
                      <h1 className="text-xl font-medium">No Product Found!</h1>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
                    {products?.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-[70%]">
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="w-[300px] h-[300px] object-contain"
                    src={productNotFound}
                    alt="Category not found"
                  />
                  <h1 className="text-xl font-medium">Category Not Found!</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
