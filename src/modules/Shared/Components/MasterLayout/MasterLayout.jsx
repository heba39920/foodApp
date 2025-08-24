
import { useState } from 'react';
import NavBarComponent from '../Navbar/NavBar'
import SideBarComponent from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
export default function MasterLayout() {
    const [sidebarToggled, setSidebarToggled] = useState(false); // Drawer للموبايل
  const toggleSidebarMobile = () => setSidebarToggled((p) => !p);
  return (
      <div className="d-flex">
       <div className="position-sticky top-0 vh-100 z-3">
          <SideBarComponent toggled={sidebarToggled}  setToggled={toggleSidebarMobile}/>
          </div>
        <div className="w-100">
          <NavBarComponent  onToggleSidebar={toggleSidebarMobile}/>
          <Outlet />
        </div>
      </div>
   
   
  )
}
