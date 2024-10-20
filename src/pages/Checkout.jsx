import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../store/features/cart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { setLoading } from "../store/features/common";
import { fetchUserInfo } from "../api/userInfo";
import Loader from "../components/Loader";
import DateSelector from "../components/DateSelector";
import Payment from "./Payment";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isLoading = useSelector((state) => state.commonState.loading);
  const [userInfo, setUserInfo] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

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

  useEffect(() => {
    const fetchAndLoadUserInfo = async () => {
      try {
        dispatch(setLoading(true));
        const res = await fetchUserInfo();
        setUserInfo(res);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAndLoadUserInfo();
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex flex-col min-h-screen mt-24">
        {/* title */}
        <h1 className="mt-10 mb-5 text-3xl font-medium text-left text-gray-700 uppercase">
          | Order Summary
        </h1>
        <div className="mt-5">
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-xl font-medium">Delivery Address</h3>
              <div className="mt-2">
                {userInfo?.addresses && userInfo.addresses.length > 0 ? (
                  <div className="flex flex-col">
                    <p>{userInfo.addresses[0].name},</p>
                    <p>{userInfo.addresses[0].street}</p>
                    <p>
                      {userInfo.addresses[0].city},{" "}
                      {userInfo.addresses[0].state} -{" "}
                      {userInfo.addresses[0].zip_code}
                    </p>
                  </div>
                ) : (
                  <p>No delivery address available</p>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col max-w-xs gap-2">
                <div className="flex items-center justify-between border-b">
                  <p>Items Count</p>
                  <p>{cartItems?.length}</p>
                </div>
                <div className="flex items-center justify-between border-b">
                  <p>Subtotal</p>
                  <p>${subTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-b">
                  <p>Shipping Fee</p>
                  <p>{shippingFee === 0 ? "Free" : `$${shippingFee}`}</p>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>${(subTotal + shippingFee).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-8" />
          <div>
            <div className="flex">
              <div className="flex-1">
                <h3 className="text-xl font-medium">Choose Delivery Address</h3>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium">Select Delivery Date</h3>
                <DateSelector onDateSelect={handleDateSelect} />
              </div>
            </div>
          </div>

          <hr className="my-8" />
          <div>
            <h3 className="text-xl font-medium">Select payment option</h3>
            <div className="flex">
              <div className="flex flex-col gap-1.5 mt-3 flex-1">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="payment-method"
                    value="CARD"
                    onChange={() => setPaymentMethod("CARD")}
                    defaultChecked
                  />
                  <p>Credit/Debit Card</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="payment-method"
                    value="UPI"
                    onChange={() => setPaymentMethod("UPI")}
                  />
                  <p>UPI/Wallet</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="payment-method"
                    value="COD"
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <p>Cash on Delivery</p>
                </div>
              </div>
              <div className="flex-1 mt-3">
                {paymentMethod === "CARD" && (
                  <Payment
                    userId={userInfo?.id}
                    addressId={userInfo?.addresses[0]?.id}
                    totalAmount={(subTotal + shippingFee).toFixed(2)}
                    expectedDeliveryDate={selectedDate?.toISOString()}
                    paymentMethod={paymentMethod}
                  />
                )}
              </div>
            </div>
            {paymentMethod === "UPI" && (
              <button className="px-8 py-3 mt-5 text-sm text-white bg-black active:bg-gray-700">
                PAY NOW
              </button>
            )}
            {paymentMethod === "COD" && (
              <button className="px-8 py-3 mt-5 text-sm text-white bg-black active:bg-gray-700">
                CONFIRM ORDER
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
