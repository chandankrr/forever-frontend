export const createRequest = (
  cartItems,
  userId,
  addressId,
  totalAmount,
  expectedDeliveryDate
) => {
  let request = {};
  request.user_id = userId;
  request.address_id = addressId;
  request.order_date = new Date().toISOString();
  let orderItems = [];
  cartItems?.map((item) => {
    orderItems.push({
      product_id: item?.productId,
      product_variant_id: item?.variant?.id,
      discount: 0,
      quantity: item?.quantity,
    });
  });
  request.order_item_requests = orderItems;
  request.currency = "inr";
  request.total_amount = totalAmount;
  request.discount = 0;
  request.payment_method = "CARD";
  request.expected_delivery_date = expectedDeliveryDate;
  return request;
};
