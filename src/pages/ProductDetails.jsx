import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateOriginalPrice, loadProductById } from "../utils/function";
import {
  MoveRight,
  ShieldCheck,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";
import product from "../data/product.json";
import BreadCrumb from "../components/BreadCrumb";
import category from "../data/category.json";
import Rating from "../components/Rating";
import RelatedProduct from "../components/RelatedProduct";

const ProductDetails = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [image, setImage] = useState("");
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([
    { title: "shop", path: "/" },
  ]);
  const [appliedSizes, setAppliedSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const onClickDiv = useCallback((item) => {
    setAppliedSizes((prevSizes) =>
      prevSizes.includes(item)
        ? prevSizes.filter((size) => size !== item)
        : [...prevSizes, item]
    );
  }, []);

  const originalPrice = calculateOriginalPrice(
    productDetails?.price,
    productDetails?.discount
  );

  const productCategory = useMemo(() => {
    return category.categories?.find(
      (category) => category?.id === productDetails?.category_id
    );
  }, [productDetails]);

  const productType = useMemo(() => {
    return productCategory?.types?.find(
      (item) => item?.id === productDetails?.type_id
    );
  }, [productCategory, productDetails]);

  useEffect(() => {
    const product = loadProductById(productId);
    setProductDetails(product);

    if (product && product.images && product.images.length > 0) {
      setImage(product.images[0]);
    }
  }, [productId]);

  useEffect(() => {
    setBreadCrumbLinks([{ title: "Shop", path: "/" }]);

    if (productCategory) {
      setBreadCrumbLinks((prevLinks) => [
        ...prevLinks,
        { title: productCategory.name, path: productCategory.path },
      ]);
    }

    if (productType) {
      setBreadCrumbLinks((prevLinks) => [
        ...prevLinks,
        { title: productType.name, path: "" },
      ]);
    }
  }, [productCategory, productType]);

  useEffect(() => {
    if (productDetails?.color?.length > 0) {
      setSelectedColor(productDetails?.color[0]);
    }
  }, [productDetails]);

  return (
    <div className="mt-24 transition-opacity duration-500 ease-in opacity-100">
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* product image */}
        <div className="flex flex-col-reverse flex-1 gap-3 mt-5 sm:flex-row">
          {/* image stack */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productDetails?.images?.map((item, idx) => (
              <img
                onClick={() => setImage(item)}
                key={idx}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          {/* selected image */}
          <div className="w-full sm:w-[80%]">
            {image && <img className="w-full h-auto" src={image} />}
          </div>
        </div>

        {/* product details */}
        <div className="flex-1 pt-4 mt-5">
          {/* breadcrumb */}
          <BreadCrumb links={breadCrumbLinks} />
          {/* title */}
          <h1 className="mt-5 text-2xl font-medium">{productDetails?.title}</h1>
          {/* rating */}
          <Rating rating={productDetails?.rating} />
          {/* price */}
          <p className="flex items-baseline gap-2 text-3xl font-medium mt-7">
            ${productDetails?.price}{" "}
            <span className="text-base font-light line-through text-gray-500/75">
              ${originalPrice}{" "}
            </span>
            <span className="text-base font-light text-orange-400">
              ({productDetails?.discount}% OFF)
            </span>
          </p>
          {/* size selector */}
          <div className="flex flex-col gap-3 mt-10">
            <div className="flex flex-row gap-10">
              <p className="font-medium">Select Size</p>
              <div className="flex flex-row gap-3 text-gray-500">
                <p className="font-medium">Size Guide</p>
                <MoveRight />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {productDetails?.size.map((size, index) => {
                const isSelected = appliedSizes.includes(size);
                return (
                  <div
                    className={`flex items-center justify-center h-8 text-gray-600 border cursor-pointer w-9 hover:border-orange-500 ${
                      isSelected ? "border-orange-500" : "border"
                    }`}
                    key={index}
                    onClick={() => onClickDiv(size)}
                  >
                    <p className="text-sm">{size}</p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* available colors */}
          <div className="flex flex-col gap-3 mt-4">
            <p className="font-medium">Available Colors</p>
            <div className="flex flex-wrap gap-3">
              {productDetails?.color?.map((item, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer`}
                  onClick={() => setSelectedColor(item)}
                >
                  <div
                    className={`size-6 rounded-full ${
                      selectedColor === item
                        ? "ring-1 ring-offset-2 ring-black"
                        : ""
                    }`}
                  >
                    <div
                      className="border border-gray-300 rounded-full size-full"
                      style={{ backgroundColor: item?.toLowerCase() }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {selectedColor && (
              <p className="text-sm text-gray-600">Selected: {selectedColor}</p>
            )}
          </div>
          {/* add to cart button */}
          <button className="px-8 py-3 mt-10 text-sm text-white bg-black active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 mb-4 sm:w-4/5" />
          {/*  */}
          <div className="flex w-4/5">
            <div className="grid w-full grid-cols-2 text-gray-600 c">
              <div className="flex items-center justify-start h-16 gap-2 pl-5">
                <ShieldCheck />
                <p>Quality Products</p>
              </div>
              <div className="flex items-center justify-start h-16 gap-2 pl-5">
                <Truck />
                <p>Free Shipping</p>
              </div>
              <div className="flex items-center justify-start h-16 gap-2 pl-5">
                <Package />
                <p>7 Days Return</p>
              </div>
              <div className="flex items-center justify-start h-16 gap-2 pl-5">
                <CreditCard />
                <p>Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* description */}
      <div className="mt-10">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Review</p>
        </div>

        <div className="flex flex-col gap-4 p-6 text-sm text-gray-500 border">
          <p>{productDetails?.description}</p>
        </div>
      </div>

      {/* related products */}
      <RelatedProduct product={product} productDetails={productDetails} />
    </div>
  );
};

export default ProductDetails;
