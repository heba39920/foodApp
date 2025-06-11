export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Email is invalid",
  },
};
export const nameValidation = {
  required: "name is required",
};
export const userNameValidation = {
  required: "User Name is required",
};
export const phoneValidation = {
  required: "phone is required",
};
export const countryValidation = {
  required: "country is required",
};
export const RecipeImageValidation = {
  required: "Recipe's image is required",
};
export const priceValidation = {
  required: "price is required",
};
export const tagValidation = {
  required: "tag is required",
};
export const imageValidation = {
  required: "Image is required",
};
export const categoryValidation = {
  required: "Category is required",
};
export const descriptionValidation = {
  required: "description is required",
};
export const passValidation = {
  required: {
    value: true,
    message: "Password is required",
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/,
    message: "Password is invalid",
  },
};
export const ConfirmPassValidation = {
  required: "Confirm Password is required",
  invalid: "Password is not matching",
};
export const newPassValidation = {
 required: {
    value: true,
    message: "New Password is required",
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/,
    message: "New Password is invalid",
  },
};
export const oldPassValidation = {
  required: "Old Password is required",
  invalid: "Old Password is invalid",
};
export const otpValidation = {
  required: "OTP is required",
  invalid: "OTP is invalid",
};


