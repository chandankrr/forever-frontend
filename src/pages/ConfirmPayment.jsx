import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoading } from "../store/features/common";
import { confirmPaymentAPI } from "../api/order";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const ConfirmPayment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonState.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const redirectStatus = query.get("redirect_status");
    const paymentIntent = query.get("payment_intent");

    if (redirectStatus) {
      dispatch(setLoading(true));
      confirmPaymentAPI({
        payment_intent: paymentIntent,
        status: redirectStatus,
      })
        .then((res) => {
          const orderId = res?.orderId;
          switch (redirectStatus) {
            case "succeeded":
              navigate(`/orderConfirmed?orderId=${orderId}`);
              toast.success("Payment successful!");
              break;
            case "pending":
              navigate(`/orderPending?orderId=${orderId}`);
              toast.warning(
                "Payment is pending. We'll update you once it's confirmed."
              );
              break;
            case "failed":
              navigate(`/orderFailed?orderId=${orderId}`);
              toast.error(
                "Payment failed. Please try again or contact support."
              );
              break;
            default:
              toast.error(`Unexpected payment status: ${redirectStatus}`);
              navigate("/");
          }
        })
        .catch((err) => {
          console.error("Payment confirmation error:", err);
          toast.error(
            "An error occurred while confirming your payment. Please contact support."
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    } else {
      toast.error(
        "No payment status received. Please try again or contact support."
      );
      navigate("/");
    }
  }, [dispatch, location, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <div className="min-h-[100vh] mt-24 ">Processing payment...</div>;
};

export default ConfirmPayment;
