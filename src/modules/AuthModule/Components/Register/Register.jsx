import { Link, useNavigate } from "react-router-dom";
import "../Login/Login";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  ConfirmPassValidation,
  country,
  emailValidation,
  passValidation,
  phone,
  userName,
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useState } from "react";



export default function Register() {
  const [visible,setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  }
  const navigate = useNavigate();
const {register,handleSubmit,formState:{errors}, watch} = useForm();
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
  const registerData = appendToFormData(data);
  
  
  try {
    const response = await axiosInstance.post(AUTH_URLS.register,registerData);
    console.log(response);
    toast.success("Verify Your Account Now",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
   console.log(response);
   
    navigate("/verify-account");
  } catch (error) {
    console.log(error);
    toast.error("Login Failed",{
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
      <h3 className="text-capitalize">Register</h3>
      <p>Welcome! Please enter your details</p>
    <div className="row">
    <div className="col-md-6">
       <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-user"></i></span>
        <input type="text" placeholder="UserName" className="form-control" 
         {...register("userName",{required: userName.required})} />
    
        </div>
         <span className="text-danger">{errors?.userName?.message}</span>
             <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-globe"></i></span>
        <input type="text" placeholder="Country" className="form-control" 
         {...register("country",{required: country.required})} />
    
        </div>
         <span className="text-danger">{errors?.country?.message}</span>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
        <input type={visible? "text": "password"} placeholder="Password" className="form-control" id="exampleInputPassword1"  
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
    </div>
    <div className="col-md-6">
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
            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen"></i></span>
        <input type="text" placeholder="Phone Number" className="form-control" 
         {...register("phoneNumber",{required: phone.required})} />
    
        </div>
         <span className="text-danger">{errors?.phoneNumber?.message}</span>
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
      
    </div>   
    <input type="file" className="form-control" {...register("profileImage")}/>
    </div>
    </div>
      <div className="links d-flex justify-content-between mb-5">
      <Link to="/login" className="text-decoration-none text-black">Login Now?</Link>
  
      </div>
    
      <button type="submit" className="btn submit-btn w-100 mb-5 fw-bold">Register</button>
    
    
    </form> 
  )
}
