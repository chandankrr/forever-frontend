import { useDispatch, useSelector } from "react-redux";
import { countCartItems, selectCartItems } from "../store/features/cart";
import { useCallback, useMemo } from "react";
import {
  deleteItemFromCartAction,
  updateItemToCartAction,
} from "../store/actions/cartAction";
import { Trash2 } from "lucide-react";
import { isTokenValid } from "../utils/jwtHelper";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import NumberInput from "../components/NumberInput";
import emptyCart from "../assets/images/product-not-found.jpg";

const Cart = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonState.loading);
  const cartItems = useSelector(selectCartItems);
  const cartLength = useSelector(countCartItems);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);

  const onChangeQuantity = useCallback(
    (value, productId, variantId) => {
      dispatch(
        updateItemToCartAction({
          productId: productId,
          variantId: variantId,
          quantity: value,
        })
      );
    },
    [dispatch]
  );

  const onDeleteProduct = useCallback(
    (productId, variantId) => {
      dispatch(
        deleteItemFromCartAction({
          productId: productId,
          variantId: variantId,
        })
      );
    },
    [dispatch]
  );

  const subTotal = useMemo(() => {
    let value = 0;
    cartItems.forEach((element) => (value += element.subTotal));
    return value;
  }, [cartItems]);

  const shippingFee = useMemo(() => {
    if (subTotal >= 50) {
      return 0;
    } else {
      return Math.ceil(Number((subTotal * 0.1).toFixed(2)));
    }
  }, [subTotal]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex flex-col mt-24">
        {/* title */}
        <h1 className="mt-10 mb-5 text-3xl font-medium text-left text-gray-700 uppercase">
          | Your Cart
        </h1>
        {cartLength <= 0 ? (
          // if cart is empty
          <div className="flex justify-center items-center flex-col min-h-[60vh] text-center gap-2">
            <img
              className="w-[300px] h-[300px] object-contain"
              src={emptyCart}
              alt="Empty cart"
            />
            <h1 className="text-xl font-medium">Your cart is empty!</h1>
            <p className="max-w-md mb-5 text-sm text-gray-600">
              Looks like you have not added anything in you cart. <br />
              Go ahead and explore top categories.
            </p>
            <Link
              to="/"
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // cart items listing
          <div>
            {cartItems?.map((item, index) => (
              <div
                className="py-4 border-y grid grid-cols-[2fr_1.5fr_1.5fr_1fr] items-center gap-4"
                key={index}
              >
                <div>
                  <div className="flex gap-5">
                    <Link to={`/product/${item?.slug}`}>
                      <img
                        className="h-[160px] object-cover "
                        src={item?.thumbnail}
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col gap-0.5 pt-2">
                      <p className="mb-2 text-lg font-medium">
                        {item?.productName}
                      </p>
                      <p className="text-sm text-gray-700/90">
                        Size: {item?.variant?.size}
                      </p>
                      <p className="text-sm text-gray-700/90">
                        Color: {item?.variant?.color}
                      </p>
                      <p className="text-sm text-gray-700/90">
                        Price: ${item?.price}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <NumberInput
                    quantity={item?.quantity}
                    max={4}
                    onChangeQuantity={(value) =>
                      onChangeQuantity(value, item?.id, item?.variant?.id)
                    }
                  />
                </div>
                <p className="text-center">${item?.subTotal}</p>
                <p className="flex items-center justify-center">
                  <Trash2
                    className="cursor-pointer hover:text-red-600"
                    onClick={() =>
                      onDeleteProduct(item?.productId, item?.variant?.id)
                    }
                  />
                </p>
              </div>
            ))}

            {/* cart total */}
            <div className="flex justify-end mt-10">
              <div className="w-full max-w-sm p-4">
                <h3 className="text-xl font-medium">CART TOTAL</h3>
                <div className="flex flex-col gap-2 mt-5">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${subTotal.toFixed(2)}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</p>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>${(subTotal + shippingFee).toFixed(2)}</p>
                  </div>
                </div>
                {/* checkout button */}
                {isLoggedIn ? (
                  <button className="float-right px-8 py-3 mt-10 text-sm text-white bg-black active:bg-gray-700">
                    PROCEED TO CHECKOUT
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="float-right px-8 py-3 mt-10 text-sm text-white bg-black active:bg-gray-700"
                  >
                    LOGIN TO CHECKOUT
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
