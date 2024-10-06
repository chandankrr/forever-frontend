import axios from "axios";
import { API_BASE_URL } from "./constant";

export const loginAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/login";

  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });

    return response?.data;
  } catch (error) {
    console.log("Login API Error: ", error);
    return Promise.reject(error);
  }
};

export const registerAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/register";

  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });

    return response?.data;
  } catch (error) {
    console.log("Register API Error: ", error);
    return Promise.reject(error);
  }
};

export const verifyAPI = async (body) => {
  const url = API_BASE_URL + "/api/auth/verify";

  try {
    const response = await axios(url, {
      method: "POST",
      data: body,
    });

    return response?.data;
  } catch (error) {
    console.log("Register API Error: ", error);
    return Promise.reject(error);
  }
};
