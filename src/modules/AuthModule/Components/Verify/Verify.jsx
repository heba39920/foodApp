import "../Login/Login.css";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  emailValidation,
    otpValidation
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useNavigate } from "react-router-dom";

export default function Verify() {
    const navigate = useNavigate();
 const {register,handleSubmit,formState:{errors}} = useForm();

const onSubmit = async (data) => {
  try {
    const response = await axiosInstance.put(AUTH_URLS.verify,data);
   
    
    console.log(response);
    toast.success("Account is verified successfully",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    navigate("/login");
  } catch (error) { 
    console.log(AUTH_URLS.verify);
    console.log(error);
    toast.error(error.message,{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    
  }
  
}
  return (
   <form onSubmit={handleSubmit(onSubmit)}>
       <div className="mb-3">
       <h3 className="text-capitalize"> Verify Account</h3>
       <p>Please Enter Your Otp  or Check Your Inbox</p>
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
         <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type="text" placeholder="Enter OTP" className="form-control" 
          {...register("code",{
           required: {
             value: true,
             message: otpValidation.required
           }
          })} />
          </div>
        <span className="text-danger">{errors?.code?.message}</span>
       <button type="submit" className="btn submit-btn w-100 mb-5 fw-bold">Verify</button>
     
     
     </form>
  )
}
