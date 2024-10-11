import { API_BASE_URL, getHeaders } from "./constant";
import axios from "axios";

export const fetchUserInfo = async () => {
  const url = API_BASE_URL + "/api/user/profile";

  try {
    const response = await axios(url, {
      method: "GET",
      headers: getHeaders(),
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
