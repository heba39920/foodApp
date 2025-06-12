import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sideBarImg from '../../../../assets/images/3.png';
import { useState } from 'react';
import { useAuthContext } from '../../../../Context/AuthContext';

export default function SideBarComponent() {
   const  {userData}= useAuthContext();
   
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
    {userData?.userGroup === 'SuperAdmin'?<MenuItem icon={<i className="fa fa-users"></i>} component={<Link to="users" />}>Users</MenuItem>:''}  
    <MenuItem icon={<i className="fa fa-folder-tree"></i>} component={<Link to="recipes" />}>Recipes</MenuItem>
    {userData?.userGroup === 'SuperAdmin'?(
      <>
        <MenuItem icon={<i className="fa-solid fa-calendar-days"></i>} component={<Link to="categories" />}>Categories</MenuItem>
        <MenuItem icon={<i className="fa fa-lock"></i>} component={<Link to="/change-password" />}>Change Password</MenuItem>
      </>
    ):''}
    {userData?.userGroup !== 'SuperAdmin'? <MenuItem icon={<i className="fa fa-heart"></i>} component={<Link to="favorites" />}>Favorites</MenuItem>:''}
    <MenuItem icon={<i className="fa fa-right-from-bracket"></i>}  onClick={handleLogout}>Logout</MenuItem>


  </Menu>
</Sidebar>
</div>
  )
}



