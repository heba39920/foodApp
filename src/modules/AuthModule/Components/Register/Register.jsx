import { Link, useNavigate } from "react-router-dom";
import "../Login/Login";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  ConfirmPassValidation,
  countryValidation,
  emailValidation,
  imageValidation,
  passValidation,
  phoneValidation,
  userNameValidation,
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
     const [firstVisible,setFirstVisible] = useState(false);
   const [secondVisible,setSecondVisible] = useState(false);
 const handleFirstVisible = () => {
     setFirstVisible(!firstVisible);
   }
   
   const handleSecondVisible = () => {
     setSecondVisible(!secondVisible);
   }
  const navigate = useNavigate();
const {register,handleSubmit,formState:{errors}, watch, trigger} = useForm({mode:"onChange"});
  // This effect is used to trigger validation for confirmPassword whenever password changes
   const passwordValue = watch('password');
   useEffect(() => {
    if (watch("confirmPassword")) {
       trigger("confirmPassword");
     }
  
   }, [passwordValue, trigger, watch]);
 const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append('userName', data?.userName);
    formData.append('email', data?.email);
    formData.append('country', data?.country);
    formData.append('phoneNumber', data?.phoneNumber);
    formData.append('password', data?.password );
    formData.append('confirmPassword', data?.password );
    formData.append('profileImage', data?.profileImage);
    if (data?.profileImage) {
      if (Array.isArray(data.profileImage)) {
        formData.append('profileImage', data.profileImage[0]);
      } else {
        formData.append('profileImage', data.profileImage);
      }
    }
    return formData;
  };
const onSubmit = async (data) => {
  setIsLoading(true);
  const registerData = appendToFormData(data);
  try {
    const response = await axiosInstance.post(AUTH_URLS.register,registerData);
 
    toast.success(response?.data?.message,{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  
    navigate("/verify-account", {state: data.email});
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
      <h3 className="text-capitalize">Register</h3>
      <p>Welcome! Please enter your details</p>
    <div className="row">
    <div className="col-md-6">
       <div className="input-group my-2">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
        <input type="text" placeholder="UserName" className="form-control" 
         {...register("userName",userNameValidation)} />
        </div>
         <span className="text-danger">{errors?.userName?.message}</span>
             <div className="input-group my-2">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-globe"></i></span>
        <input type="text" placeholder="Country" className="form-control" 
         {...register("country", countryValidation)} />
        </div>
         <span className="text-danger">{errors?.country?.message}</span>
      <div className="input-group my-2">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={firstVisible? "text": "password"} placeholder="Password" className="form-control" id="exampleInputPassword1"  
        {...register("password",passValidation)} />
          <div className="input-group-text" onClick={handleFirstVisible}>
            {firstVisible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </div>
      </div>
         <span className="text-danger">{errors?.password?.message}</span>
    </div>
    <div className="col-md-6">
           <div className="input-group my-2">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
        <input type="email" placeholder="Enter Your E-mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
         {...register("email",emailValidation)} />
        </div>
         <span className="text-danger">{errors?.email?.message}</span>
            <div className="input-group my-2">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen"></i></span>
        <input type="text" placeholder="Phone Number" className="form-control" 
         {...register("phoneNumber",phoneValidation)} />
        </div>
         <span className="text-danger">{errors?.phoneNumber?.message}</span>
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
    </div>   
   <div className="my-2"> <input type="file" className="form-control" {...register("profileImage", imageValidation)}/></div>
         <span className="text-danger">{errors?.profileImage?.message}</span>

    </div>
    </div>
      <div className="links d-flex justify-content-between mb-2">
      <Link to="/login" className="text-decoration-none text-black">Login Now?</Link>
      </div>
      <button type="submit" className="btn submit-btn w-100  fw-bold">Register</button>
    </form> 
  )
}
