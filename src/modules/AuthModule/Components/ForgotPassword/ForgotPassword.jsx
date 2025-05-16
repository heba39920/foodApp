import "../Login/Login.css";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  emailValidation,

} from "../../../../Constants/VALIDATION";
import { AUTH_URLS } from "../../../../Constants/END-POINTS";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
const {register,handleSubmit,formState:{errors}} = useForm();
const onSubmit = async (data) => {
  try {
    const response = await axios.post(AUTH_URLS.forgotPassword,data);
    console.log(response);
    toast.success("OTP is sent",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    navigate("/reset-password");
  } catch (error) {
    console.log(error);
    toast.error("Failed to sent OTP",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    
  }
  
}
  return <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-3">
    <h3 className="text-capitalize">forgot password</h3>
    <p>Welcome Back! Please enter your details</p>
     <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
      <input type="email" placeholder="Enter Your E-mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
       {...register("email",{
        required: {
          value: true,
          message: emailValidation.required
        },
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: emailValidation.invalid
        }
       })} />
  
      </div>
       <span className="text-danger">{errors?.email?.message}</span>
    </div>

  
    <button type="submit" className="btn submit-btn w-100 mb-5 fw-bold">submit</button>
  
  
  </form> 
}
