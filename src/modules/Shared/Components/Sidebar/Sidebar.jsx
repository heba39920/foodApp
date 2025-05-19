import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <Sidebar style={{ height: '100vh' }}>
  <Menu>
    <MenuItem component={<Link to="/dashboard" />}>Home</MenuItem>
    <MenuItem component={<Link to="/users" />}>Users</MenuItem>
    <MenuItem component={<Link to="/categories" />}>Categories</MenuItem>
    <MenuItem component={<Link to="/change-password" />}>Change Password</MenuItem>
    <MenuItem component={<Link to="logout" />}>Logout</MenuItem>


  </Menu>
</Sidebar>
  )
}



