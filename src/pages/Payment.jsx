import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublishableKey);

const Payment = ({ paymentMethod, ...props }) => {
  const [stripeOptions, setStripeOptions] = useState(null);

  useEffect(() => {
    if (paymentMethod === "CARD") {
      setStripeOptions({
        mode: "payment",
        amount: 100,
        currency: "inr",

        appearance: {
          variables: {
            colorPrimary: "#d1d5db",
            colorBackground: "#ffffff",
            colorText: "#000000",
            colorDanger: "#df1b41",
            fontFamily: "Inter",
            spacingUnit: "4px",
            borderRadius: "0px",
          },
          rules: {
            ".Input:focus": {
              boxShadow: "none",
              border: "1px solid #d1d5db",
            },
            ".Label": {
              marginTop: "6px",
            },
          },
        },
      });
    } else {
      setStripeOptions(null);
    }
  }, [paymentMethod]);

  if (!stripeOptions) {
    return null;
  }

  return (
    <div className="max-w-sm">
      <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm {...props} paymentMethod={paymentMethod} />
      </Elements>
    </div>
  );
};

export default Payment;
