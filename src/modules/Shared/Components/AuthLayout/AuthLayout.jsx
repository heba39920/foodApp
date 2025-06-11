import { Outlet } from 'react-router-dom'
import logo from "../../../../assets/images/4 3.png";
import "./AuthLayout.css";
export default function AuthLayout() {
  return (
    <section className='auth-background row justify-content-center align-items-center'>
    <div className='col-lg-6 col-md-12 col-sm-12'>
      <div className='form-container'>
    <div className='text-center mb-4'> <img className='w-50' src={logo} alt="logo" /></div> 
      <Outlet/>
    </div>
    </div>     
    </section>
  )
}
