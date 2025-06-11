import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    
      <div className="d-flex">
       <div className=" position-sticky top-0  vh-100 ">
          <SideBar />
          </div>
      
  
        <div className="w-100">
          <NavBar />
             
          <Outlet />
        </div>
      </div>
   
   
  )
}
