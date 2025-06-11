import "../Login/Login.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  emailValidation,
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
   setIsLoading(true);
    try {
      const response = await axiosInstance.post(AUTH_URLS.forgotPassword, data);
      console.log(response);
      toast.success("OTP has been sent", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      navigate("/reset-password", { state: data.email });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <h3 className="text-capitalize">Forgot Password</h3>
        <p>Welcome Back! Please enter your details</p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-envelope"></i>
          </span>
          <input
            type="email"
            placeholder="Enter Your E-mail"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email", emailValidation)}
           
          />
        </div>
        <span className="text-danger">{errors?.email?.message}</span>
      </div>
      <button
        type="submit"
        className="btn submit-btn w-100  fw-bold"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
