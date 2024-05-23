import React from "react";
import { NavbarSimple } from "./Navbar/NavbarSimple";
import Sidebar from "./Sidebar/Sidebar";

const LayoutClient = ({ children }) => {
  return (
      <>
          <div className='flex flex-auto h-screen'>
              <Sidebar />
              <div className='grow'>
                  <NavbarSimple />
                  <div className='m-5'>{children}</div>
              </div>
          </div>
      </>
  )
}

export default LayoutClient;
