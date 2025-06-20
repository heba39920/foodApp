
import NavBarComponent from '../Navbar/NavBar'
import SideBarComponent from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
export default function MasterLayout() {
  return (
      <div className="d-flex">
       <div className="position-sticky top-0 vh-100">
          <SideBarComponent />
          </div>
        <div className="w-100">
          <NavBarComponent />
          <Outlet />
        </div>
      </div>
   
   
  )
}
