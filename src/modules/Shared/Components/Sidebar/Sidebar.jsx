import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sideBarImg from '../../../../assets/images/3.png';
import { useState } from 'react';

export default function SideBar() {
  const navigate = useNavigate();
const  [isCollapsed, setIsCollapsed]= useState(false)
const handleCollapse=()=>{
  setIsCollapsed(!isCollapsed)
}
const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('/login');
  
}
  return (
    <div className='sidebar'>
    <Sidebar style={{height:'100vh'}} collapsed={isCollapsed}>
    <img src={sideBarImg} onClick={handleCollapse} className='w-75' alt="sidebar logo" />
  <Menu>
    <MenuItem icon={<i className="fa fa-house"></i>} component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem icon={<i className="fa fa-users"></i>} component={<Link to="users" />}>Users</MenuItem>
    <MenuItem icon={<i className="fa fa-folder-tree"></i>} component={<Link to="Recipes" />}>Recipes</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="categories" />}>Categories</MenuItem>
    <MenuItem icon={<i className="fa fa-lock"></i>} component={<Link to="/change-password" />}>Change Password</MenuItem>
    <MenuItem icon={<i className="fa fa-right-from-bracket"></i>}  onClick={handleLogout}>Logout</MenuItem>


  </Menu>
</Sidebar>
</div>
  )
}



