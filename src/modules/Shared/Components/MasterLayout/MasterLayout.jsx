import React from 'react'
import NavBar from '../NavBar/Navbar'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  return (
    
      <div className="d-flex">
        <div className="w-25 bg-black vh-100">
        <SideBar/>
        </div>
        <div className="w-100 bg-info">
          <NavBar/>
          <Header/>      
          <Outlet/>
        </div>
      </div>
   
   
  )
}
