import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import {
  emailValidation,
  passValidation,
} from "../../../../Constants/VALIDATION";
import { AUTH_URLS, axiosInstance } from "../../../../Constants/END-POINTS";
import { useState } from "react";
import { useAuthContext } from "../../../../Context/AuthContext";
export default function Login() {
  const {saveData} = useAuthContext();
  const [visible,setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  }
  const navigate = useNavigate();
const {register,handleSubmit,formState:{errors}} = useForm();
const onSubmit = async (data) => {
  try {
    const response = await axiosInstance.post(AUTH_URLS.login,data);
    toast.success("Login Successfully",{
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
    localStorage.setItem("token",response.data.token);
    saveData();
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Login failed. Please try again.",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      }
    );
    
  }
  
}
  return <form onSubmit={handleSubmit(onSubmit)}>
  <div className="mb-2">
  <h3 className="text-capitalize">log in</h3>
  <p>Welcome Back! Please enter your details</p>
   <div className="input-group my-2">
      <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
    <input type="email" placeholder="Enter Your E-mail" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
     {...register("email",emailValidation)} />

    </div>
     <span className="text-danger">{errors?.email?.message}</span>
  </div>
  <div className="input-group my-2">
    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
    <input type={visible? "text": "password"} placeholder="Password" className="form-control" id="exampleInputPassword1"  
    {...register("password",passValidation)} />
      <div className="input-group-text" onClick={handleVisible}>
        {visible? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
        </div>
  
  </div>
     <span className="text-danger">{errors?.password?.message}</span>

  <div className="links d-flex justify-content-between mb-5">
  <Link to="/register" className="text-decoration-none text-black">Register Now?</Link>
  <Link to="/forgot-password" className="text-decoration-none forgetPassLink" >Forgot Password?</Link>
  </div>

  <button type="submit" className="btn submit-btn w-100  fw-bold">Login</button>


</form> 
}
