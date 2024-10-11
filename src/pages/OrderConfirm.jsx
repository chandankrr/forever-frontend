import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const OrderConfirm = () => {
  const location = useLocation();

  const orderId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("orderId");
    return orderId;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen gap-2 mt-24">
      <h1>Thank you for shopping with us.</h1>
      <p>Your order has been successfully placed. Your order ID is {orderId}</p>
      <Link className="px-8 py-3 mt-5 text-sm text-white bg-black w-fit active:bg-gray-700">
        Track Order
      </Link>
    </div>
  );
};

export default OrderConfirm;
