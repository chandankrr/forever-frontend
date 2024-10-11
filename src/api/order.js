import { API_BASE_URL, getHeaders } from "./constant";
import axios from "axios";

export const placeOrderAPI = async (data) => {
  const url = API_BASE_URL + "/api/order";

  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders(),
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const confirmPaymentAPI = async (data) => {
  const url = API_BASE_URL + "/api/order/update-payment";

  try {
    const response = await axios(url, {
      method: "POST",
      data: data,
      headers: getHeaders(),
    });

    return response?.data;
  } catch (error) {
    console.error("Error in confirmPaymentAPI:", error);
    return Promise.reject(error);
  }
};
