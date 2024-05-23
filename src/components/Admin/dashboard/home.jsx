/*import React from "react";
import {  Outlet } from "react-router-dom";
import NavbarAdmin from "./navbarAdmin";
import Header from "./headerAdmin"
import Dashboard from "./Dashboard";
import Tables from "./tables";

function DashboardAdmin() {
  
  return (


    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <NavbarAdmin/>
      <div className="p-4">
        <div className="">
          <Header/>
        </div>
        <br/>
        <Dashboard/>
        <br/>
        <div>{<Outlet/>}</div>
      </div>
     
       
    </div>
  );
}

export default DashboardAdmin;
*/

import React, { useState } from "react";
import {  Outlet, useLocation } from "react-router-dom";
import Sidenav from "../widgets/layout/sidenav";
import DashboardNavbar from "../widgets/layout/dashboard-navbar";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

function DashboardAdmin() {
  const [selectedItem, setSelectedItem] = useState("/admin");
  const location = useLocation();

  const handleItemClick = () => {
    setSelectedItem(location.pathname);
    console.log("location from home",location)
  };
  return (
      <div>
      <Sidenav handleItemClick={handleItemClick} />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
   
        <div>{<Outlet/>}</div>

        </div>
      </div>
   
  );
}

export default DashboardAdmin;
