import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequest } from "../utils/orderUtil";
import { selectCartItems } from "../store/features/cart";
import { placeOrderAPI } from "../api/order";
import { setLoading } from "../store/features/common";
import toast from "react-hot-toast";

const CheckoutForm = ({
  userId,
  addressId,
  totalAmount,
  expectedDeliveryDate,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const orderRequest = createRequest(
        cartItems,
        userId,
        addressId,
        totalAmount,
        expectedDeliveryDate
      );
      dispatch(setLoading(true));

      try {
        const { error } = await elements.submit();
        if (error?.message) {
          toast.error(error?.message);
          return;
        }

        const res = await placeOrderAPI(orderRequest);

        const { error: paymentError } = await stripe.confirmPayment({
          elements,
          clientSecret: res?.credentials?.client_secret,
          confirmParams: {
            return_url: `${window.location.origin}/confirmPayment`,
          },
        });

        if (paymentError) {
          toast.error(paymentError.message);
        } else {
          toast.success("Payment successful!");
        }
      } catch (err) {
        toast.error("An error occurred. Please try again.");
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [cartItems, userId, addressId, totalAmount, expectedDeliveryDate, dispatch]
  );

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="px-8 py-3 mt-5 text-sm text-white bg-black active:bg-gray-700"
        type="submit"
        disabled={!stripe || !elements}
      >
        PAY NOW
      </button>
    </form>
  );
};

export default CheckoutForm;
