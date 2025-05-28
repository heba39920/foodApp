import "../Login/Login.css";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  emailValidation,
  passValidation,
  ConfirmPassValidation,
    otpValidation
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
 const {register,handleSubmit,formState:{errors},watch} = useForm();
 
   const [visible,setVisible] = useState(false);
   const handleVisible = () => {
     setVisible(!visible);
   }
const onSubmit = async (data) => {
  try {
    const response = await axiosInstance.post(AUTH_URLS.resetPassword,data);
    console.log(response);
    toast.success("Password is updated successfully",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    navigate("/login");
  } catch (error) {
    console.log(error);
    toast.error("password is not updated",{
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
    <h3 className="text-capitalize">reset password</h3>
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
      <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
     <input type="text" placeholder="Enter OTP" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
       {...register("seed",{
        required: {
          value: true,
          message: otpValidation.required
        }
       })} />
       </div>
       <span className="text-danger">{errors?.OTP?.message}</span>

     <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={visible? "text": "password"} placeholder="New Password" className="form-control" id="exampleInputPassword1"  
        {...register("password",{
          required: {
            value: true,
            message: passValidation.required
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@]{8,}$/,
            
            message: passValidation.invalid
          }
         })} />
                  <div className="input-group-text" onClick={handleVisible}>
        {visible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
        </div>
      </div>
         <span className="text-danger">{errors?.password?.message}</span>
           <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={visible? "text": "password"} placeholder="Confirm Password" className="form-control" id="exampleInputPassword1"  
        {...register("confirmPassword",{
          required: {
            value: true,
            message: passValidation.required,
            
          },
          validate:{
           validate:(value) => value === watch("password") || ConfirmPassValidation.invalid

          } 
         })} />
           <div className="input-group-text" onClick={handleVisible}>
        {visible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
        </div>
      </div>
<span className="text-danger">{errors?.confirmPassword?.message}</span>

      
    <button type="submit" className="btn submit-btn w-100 mb-5 fw-bold">Reset Password</button>
  
  
  </form>
}
