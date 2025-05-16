const BASE_URL = "https://upskilling-egypt.com:3006";
const BASE_AUTH = `${BASE_URL}/api/v1/Users`;
export const AUTH_URLS = {
  login: `${BASE_AUTH}/Login`,
  register: `${BASE_AUTH}/Register`,
  resetPassword: `${BASE_AUTH}/Reset`,
 forgotPassword: `${BASE_AUTH}/Reset/Request`,
  changePassword: `${BASE_AUTH}/ChangePassword`,
  verify: `${BASE_AUTH}/verify`,

};
