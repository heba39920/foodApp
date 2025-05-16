import { Outlet } from 'react-router-dom'
import logo from "../../../../assets/images/4 3.png";
import "./AuthLayout.css";
export default function AuthLayout() {
  return (
    <section className='auth-background row justify-content-center align-items-center'>
    <div className='col-lg-6 col-md-12 col-sm-12'>
      <div className='form-container'>
      <img className='p-5' src={logo} alt="logo" />
      <Outlet/>
    </div>
    </div>     
    </section>
  )
}
