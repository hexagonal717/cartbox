import { setAccessToken } from "../../features/customer/redux/customerAuthSlice.js";
import { publicRequest, userRequest } from "./customerAxios.js";

// Sign up new user
export const signUp = async (customerInfo) => {
  try {
    const res = await publicRequest.post("/api/customer/auth/signup", customerInfo, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Sign-up error:", error.response);
    throw error;
  }
};

// Login user
export const login = async (customerInfo, dispatch) => {
  try {
    const res = await publicRequest.post("/api/customer/auth/login", customerInfo);
    dispatch(setAccessToken(res.data));
    userRequest.defaults.headers.token = res.data.tokenId;
  } catch (error) {
    console.error("Login error:", error.response);
    throw error;
  }
};

//Forgot password user
export const forgotPassword = async (email) => {
  try {
    const res = await publicRequest.post(
      `/api/customer/auth/forgotpassword`,
      email,
    );
    console.log(res.data, "forgotPassword data");
    return res.data;
  } catch (error) {
    console.error("Forgot password error:", error.response);
    throw error;
  }
};

export const verifyOtp = async (otp) => {
  try {
    const res = await publicRequest.post("/api/customer/auth/verifyotp", otp);
    console.log(res.data, "otp verify check");
    return res.data;
  } catch (error) {
    console.error("otp verification failed.", error.response);
  }
};

export const changePassword = async (email, password) => {
  try {
    const res = await publicRequest.post("/api/customer/auth/changePassword", {
      email,
      password,
    });
    console.log("changePassword clientSide check:", res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// Get user info by ID
export const getCustomerInfoByParams = async (customerId) => {
  try {
    const res = await userRequest.get(`/api/customer/getCustomerInfoByParams/${customerId}`);
    console.log("heyyyyy", res.data);
    return res.data;
  } catch (error) {
    console.error("Get customer info error:", error.response);
    throw error;
  }
};

// Update user info by ID
export const putCustomerInfoByParams = async (customerId, customerInfo) => {
  try {
    const res = await userRequest.put(
      `/api/customer/putCustomerInfoByParams/${customerId}`,
      customerInfo,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Update user info error:", error.response);
    throw error;
  }
};

// Delete user info by ID
export const deleteCustomerInfoById = async (customerId) => {
  try {
    const res = await userRequest.delete(
      `/api/customer/deleteCustomerInfoByParams/${customerId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Delete user info error:", error.response);
    throw error;
  }
};

// Get product info list
export const getProductInfoList = async () => {
  try {
    const res = await userRequest.get(`/api/customer/product/getProductInfoList`);
    console.log("heyyyyy", res.data);
    return res.data;
  } catch (error) {
    console.error("Get product list info error:", error.response);
    throw error;
  }
};

// Get product info list
export const getProductDetailByParams = async (productId) => {
  try {
    const res = await userRequest.get(`/api/customer/product/getProductDetailByParams/${productId}`);

    console.log(productId)
    console.log("product detail first check", res.data);
    return res.data;
  } catch (error) {
    console.error("Get product detail error:", error.response);
    throw error;
  }
};

