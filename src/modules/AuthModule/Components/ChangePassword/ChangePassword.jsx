import { Link, useNavigate } from "react-router-dom";
import "../Login/Login";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {

  ConfirmPassValidation,
  newPassValidation,
  oldPassValidation,

} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useState } from "react";

export default function ChangePassword() {
         const [firstVisible,setFirstVisible] = useState(false);
   const [secondVisible,setSecondVisible] = useState(false);
   const [thirdVisible,setThirdVisible] = useState(false);

 const handleFirstVisible = () => {
     setFirstVisible(!firstVisible);
   }
   
   const handleSecondVisible = () => {
     setSecondVisible(!secondVisible);
   }
    const handleThirdVisible = () => {
     setThirdVisible(!thirdVisible);
   }
    const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}, watch} = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(AUTH_URLS.changePassword,data);
      toast.success(response?.data?.message,{
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
     console.log(response);
     
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message,{
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
      <div className="mb-2">
      <h3 className="text-capitalize">Change password</h3>
      <p>Welcome Back! Please enter your details</p>
      </div>
   
        <div className="input-group my-2">
           <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
           <input type={firstVisible? "text": "password"} placeholder="Old Password" className="form-control" id="exampleInputPassword1"  
           {...register("oldPassword",oldPassValidation)} />
                     <div className="input-group-text" onClick={handleFirstVisible}>
           {firstVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
           </div>
         </div>
            <span className="text-danger">{errors?.oldPassword?.message}</span> 
             <div className="input-group my-2">
           <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
           <input type={secondVisible? "text": "password"} placeholder="New Password" className="form-control" id="exampleInputPassword1"  
           {...register("newPassword",newPassValidation)} />
                     <div className="input-group-text" onClick={handleSecondVisible}>
           {secondVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
           </div>
         </div>
            <span className="text-danger">{errors?.newPassword?.message}</span>
              <div className="input-group my-2">
           <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
           <input type={thirdVisible? "text": "password"} placeholder="Confirm Password" className="form-control" id="exampleInputPassword1"  
           {...register("confirmNewPassword",{
             required: {
               value: true,
               message: ConfirmPassValidation.required,
               
             },
             validate:{
              validate:(value) => value === watch("newPassword") || ConfirmPassValidation.invalid
   
             } 
            })} />
              <div className="input-group-text" onClick={handleThirdVisible}>
           {thirdVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
           </div>
         </div>
   <span className="text-danger">{errors?.confirmNewPassword?.message}</span>
         
    
      <button type="submit" className="btn submit-btn w-100 mt-4 fw-bold">Save Password</button>
    
    
    </form> 
  )
}
