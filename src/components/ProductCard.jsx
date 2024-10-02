import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { calculateOriginalPrice } from "../utils/function";

const ProductCard = ({ product }) => {
  const originalPrice = calculateOriginalPrice(product.price, product.discount);

  return (
    <div className="relative flex flex-col gap-2 text-black transition duration-150 ease-in-out hover:scale-105">
      <Link to={`/product/${product.slug}`}>
        <div className="overflow-hidden">
          <img src={product?.thumbnail} alt="" />
        </div>

        <div className="flex flex-col gap-1.5 pl-3 cursor-pointer">
          <div className="flex flex-col">
            <p className="text-base font-semibold">{product?.brand}</p>
            <p className="text-sm font-normal text-gray-600">{product?.name}</p>
          </div>
          <p className="flex items-baseline gap-2 text-sm font-semibold">
            ${product?.price}
            {product?.discount > 0 && (
              <>
                <span className="text-xs font-light line-through text-gray-500/75">
                  ${originalPrice}
                </span>
                <span className="text-xs font-light text-orange-400">
                  ({product?.discount}% OFF)
                </span>
              </>
            )}
          </p>
        </div>
      </Link>

      <button
        className="absolute flex items-center justify-center text-gray-700 bg-white rounded-full top-2 right-2 size-7"
        onClick={() => {
          console.log("button clicked");
        }}
      >
        <Heart className="text-gray-700 size-4 hover:text-primary" />
      </button>
    </div>
  );
};

export default ProductCard;
