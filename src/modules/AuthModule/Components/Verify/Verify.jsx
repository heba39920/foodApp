import "../Login/Login.css";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  emailValidation,
    otpValidation
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useLocation, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useState } from "react";

export default function Verify() {
  const location = useLocation();
    const navigate = useNavigate();
 const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{email:location.state}});
  const [isLoading, setIsLoading] = useState(false);

const onSubmit = async (data) => {
  setIsLoading(true);
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
    }
  );
    
  }finally{
    setIsLoading(false);
  }
  
}
  if (isLoading) return (<div className='d-flex align-items-center justify-content-center'>
    <Oval
      visible={true}
      height="100vh"
      width="100"
      color="#009247"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    /> </div>
  );

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
       <div className="mb-2">
       <h3 className="text-capitalize"> Verify Account</h3>
       <p>Please Enter Your Otp  or Check Your Inbox</p>
        <div className="input-group my-2">
           <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
         <input disabled type="email" placeholder="Enter Your E-mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
          {...register("email",emailValidation)} />
     
         </div>
          <span className="text-danger">{errors?.email?.message}</span>
       </div>
         <div className="input-group my-2">
            <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type="text" placeholder="Enter OTP" className="form-control" 
          {...register("code",otpValidation)} />
          </div>
        <span className="text-danger">{errors?.code?.message}</span>
       <button type="submit" className="btn submit-btn w-100 mt-2 fw-bold" disabled={isLoading}>{isLoading?'verifying...':'Verify'}</button>
     
     
     </form>
  )
}
