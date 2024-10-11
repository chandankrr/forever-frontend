import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51Q8hmsSJLJ3ssFBr67I07iLSAdscrAQtcfMGRiwO3DC0pDSU8Qer5XVaRX4BBmyeOX51gXsDxYDMtdF01IXkndx400Hm0fRFTp"
);

const Payment = (props) => {
  const options = {
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
  };

  return (
    <div className="max-w-sm">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm {...props} />
      </Elements>
    </div>
  );
};

export default Payment;
