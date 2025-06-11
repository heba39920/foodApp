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
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
export default function ResetPassword() {
  const location = useLocation();

  const navigate = useNavigate();
 const {register,handleSubmit,formState:{errors},watch, trigger} = useForm({defaultValues:{email:location.state}, mode:"onChange"});
   const [firstVisible,setFirstVisible] = useState(false);
   const [secondVisible,setSecondVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const handleFirstVisible = () => {
     setFirstVisible(!firstVisible);
   }
   
   const handleSecondVisible = () => {
     setSecondVisible(!secondVisible);
   }
    // This effect is used to trigger validation for confirmPassword whenever password changes
   const passwordValue = watch('password');
   useEffect(() => {
    if (watch("confirmPassword")) {
       trigger("confirmPassword");
     }
  
   }, [passwordValue, trigger, watch]);



const onSubmit = async (data) => {
    setIsLoading(true);
  try {   
    
    await axiosInstance.post(AUTH_URLS.resetPassword,data);
   

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
  }finally {
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
  return <form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-2">
    <h3 className="text-capitalize">reset password</h3>
    <p>Welcome Back! Please enter your details</p>
     <div className="input-group my-2">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
      <input disabled type="email" placeholder="Enter Your E-mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
       {...register("email",emailValidation)} />
      </div>
       <span className="text-danger">{errors?.email?.message}</span>
    </div>
      <div className="input-group my-2">
         <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
     <input type="text" placeholder="Enter OTP" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
       {...register("seed", otpValidation)} />
       </div>
       <span className="text-danger">{errors?.seed?.message}</span>
     <div className="input-group my-2">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={firstVisible? "text": "password"} placeholder="New Password" className="form-control" id="exampleInputPassword1"  
        {...register("password", passValidation)} />
                  <div className="input-group-text" onClick={handleFirstVisible}>
        {firstVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
        </div>
      </div>
         <span className="text-danger">{errors?.password?.message}</span>
           <div className="input-group my-2">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={secondVisible? "text": "password"} placeholder="Confirm Password" className="form-control" id="exampleInputPassword1"  
        {...register("confirmPassword",{
          required: {
            value: true,
            message: ConfirmPassValidation.required,
          },
          validate:{
           validate:(value) => value === watch("password") || ConfirmPassValidation.invalid
          } 
         })} />
           <div className="input-group-text" onClick={handleSecondVisible}>
        {secondVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
        </div>
      </div>
<span className="text-danger">{errors?.confirmPassword?.message}</span>
    <button type="submit" className="btn submit-btn w-100 fw-bold mt-3">Reset Password</button>
  </form>
}
