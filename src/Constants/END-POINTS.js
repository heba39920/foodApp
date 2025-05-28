import axios from "axios";
const BASE_URL = "https://upskilling-egypt.com:3006";
const BASE_AUTH = `${BASE_URL}/api/v1/Users`;
export const axiosInstance = axios.create({
 baseURL: BASE_AUTH,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  })
export const AUTH_URLS = {
  login: `/Login`,
  register: `/Register`,
  resetPassword: `/Reset`,
 forgotPassword: `/Reset/Request`,
  changePassword: `/ChangePassword`,
  verify: `/verify`,

};
