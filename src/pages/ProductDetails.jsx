import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { calculateOriginalPrice, loadProductBySlug } from "../utils/function";
import { getAllProducts } from "../api/fetchProducts";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/features/common";
import {
  MoveRight,
  ShieldCheck,
  Truck,
  Package,
  CreditCard,
} from "lucide-react";
import { addItemToCartAction } from "../store/actions/cartAction";
import { toast } from "sonner";
import BreadCrumb from "../components/BreadCrumb";
import Rating from "../components/Rating";
import RelatedProduct from "../components/RelatedProduct";
import Loader from "../components/Loader";
import productNotFound from "../assets/images/product-not-found.jpg";
import _ from "lodash";

const ProductDetails = () => {
  const { slug } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [image, setImage] = useState("");
  const [breadCrumbLinks, setBreadCrumbLinks] = useState([
    { title: "shop", path: "/" },
  ]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonState.loading);
  const categories = useSelector((state) => state.categoryState.categories);

  const originalPrice = calculateOriginalPrice(
    productDetails?.price,
    productDetails?.discount
  );

  const onClickDiv = useCallback((item) => {
    setSelectedSize(item);
  }, []);

  const productCategory = useMemo(() => {
    return categories?.find(
      (category) => category?.id === productDetails?.category_id
    );
  }, [productDetails, categories]);

  const productCategoryType = useMemo(() => {
    return productCategory?.category_types?.find(
      (item) => item?.id === productDetails.category_type_id
    );
  }, [productDetails, productCategory]);

  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(productDetails?.product_variants, "color"));
    return colorSet;
  }, [productDetails]);

  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(productDetails?.product_variants, "size"));
    return sizeSet;
  }, [productDetails]);

  // function to handle add to cart
  const addItemToCart = useCallback(() => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const selectedVariant = productDetails?.product_variants?.find(
      (variant) =>
        variant?.size === selectedSize && variant?.color === selectedColor
    );

    if (!selectedVariant) {
      toast.error("Selected variant not found");
      return;
    }

    if (selectedVariant.stock_quantity <= 0) {
      toast.error("Selected product is out of stock");
      return;
    }

    dispatch(
      addItemToCartAction({
        productId: productDetails?.id,
        productName: productDetails?.name,
        thumbnail: productDetails?.thumbnail,
        variant: selectedVariant,
        quantity: 1,
        subTotal: productDetails?.price,
        price: productDetails?.price,
        slug: productDetails?.slug,
      })
    );

    toast.success("Product added to cart");
  }, [dispatch, productDetails, selectedColor, selectedSize]);

  // fetch product details by slug
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        dispatch(setLoading(true));
        const product = await loadProductBySlug(slug);
        if (product.length > 0) {
          setProductDetails(product[0]);
          if (product[0]?.resources?.length > 0) {
            setImage(product[0].resources[0].url);
          }
        } else {
          setProductDetails(null);
        }
      } catch (error) {
        console.error("Failed to load product details:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (slug) {
      fetchProductDetails();
    }
  }, [slug, dispatch]);

  // breadcrumb
  useEffect(() => {
    setBreadCrumbLinks([{ title: "Shop", path: "/" }]);

    if (productCategory) {
      setBreadCrumbLinks((prevLinks) => [
        ...prevLinks,
        {
          title: productCategory.name,
          path: `/${productCategory?.name.toLowerCase()}`,
        },
      ]);
    }

    if (productCategoryType) {
      setBreadCrumbLinks((prevLinks) => [
        ...prevLinks,
        { title: productCategoryType?.name, path: "" },
      ]);
    }
  }, [productCategory, productCategoryType]);

  // for default color
  useEffect(() => {
    if (colors?.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colors]);

  // related product
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await getAllProducts(
          productDetails?.category_id,
          productDetails?.category_type_id
        );

        const excludedProducts = products?.filter(
          (product) => product?.id !== productDetails.id
        );
        setRelatedProducts(excludedProducts);
      } catch (error) {
        console.error("Failed to load all products:", error);
      }
    };

    if (productDetails?.category_id) {
      fetchAllProducts();
    }
  }, [productDetails]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails) {
    return (
      <div className="flex justify-center items-center flex-col min-h-[100vh] text-center gap-2">
        <img
          className="w-[300px] h-[300px] object-contain"
          src={productNotFound}
          alt="Product not found"
        />
        <h1 className="text-xl font-medium">Product Not Found!</h1>
        <p className="max-w-md mb-5 text-sm text-gray-600">
          We're sorry, but the product you're looking for is not available. It
          may have been removed or doesn't exist.
        </p>
        <Link
          to="/"
          className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <div className="flex flex-col gap-12 sm:flex-row">
        {/* product image */}
        <div className="flex flex-col-reverse flex-1 gap-3 mt-5 sm:flex-row">
          {/* image stack */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productDetails?.resources?.map((item, index) => (
              <img
                onClick={() => setImage(item.url)}
                key={index}
                src={item.url}
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
          <h1 className="mt-5 text-2xl font-medium">{productDetails?.name}</h1>
          {/* rating */}
          <Rating rating={productDetails?.rating} />
          {/* price */}
          <p className="flex items-baseline gap-2 text-3xl font-medium mt-7">
            ${productDetails?.price}
            {productDetails?.discount > 0 && (
              <>
                <span className="text-base font-light line-through text-gray-500/75">
                  ${originalPrice}
                </span>
                <span className="text-base font-light text-orange-400">
                  ({productDetails?.discount}% OFF)
                </span>
              </>
            )}
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
              {sizes.map((size, index) => {
                const isSelected = selectedSize === size;
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
              {colors?.map((item, index) => (
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
          <button
            className="px-8 py-3 mt-10 text-sm text-white bg-black active:bg-gray-700"
            onClick={addItemToCart}
          >
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
      <RelatedProduct relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductDetails;
