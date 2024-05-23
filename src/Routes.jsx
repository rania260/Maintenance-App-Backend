import React, { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

import Home from "./components/LandingPage/Home/index";
import Signin from "./components/auth/Signin/index";
import Signup from "./components/auth/SignUp/index";
import ForgotPassword from "./components/auth/forgotPassword/ForgetPassword";
import RestPassword from "./components/auth/resetpassword/ResetPassword";
import Accueil from "./components/ClientComponent/Accueil/Accueil";
import NoRouteFound from "./components/NoRoutes/NoRouteFound";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./components/ClientComponent/Profile/UpdateProfile";
import AddUser from "./components/Admin/dashboard/AddUser"
import HomeAdmin from "./components/Admin/dashboard/home";
import ProfileAdmin from "./components/Admin/pages/dashboard/profile";


import ProfileKarima from "./components/Admin/widgets/layout/pages/ProfileKarima"
import DashboardKarima from "./components/Admin/widgets/layout/pages/DashboardKarima"
import CourseKarima from "./components/Admin/widgets/layout/pages/CourseKarima"
import EditUser from "./components/Admin/dashboard/EditUser"
import Layout from "./components/Admin/widgets/layout/Layout"
import DemandAdd from "./components/Admin/dashboard/demand-add";
import EditDemandAdd from "./components/Admin/dashboard/editDemandAdd";
import LayoutClient from "./components/ClientComponent/LayoutClient";
import SendDemand from "./components/ClientComponent/Demands/SendDemand";
import ListDemand from "./components/ClientComponent/Demands/ListDemand";
import AddEquipement from "./components/Admin/dashboard/Add-Equipement";
import EditEquipement from "./components/Admin/dashboard/edit-equipement";
import AjoutEquipement from "./components/Admin/dashboard/ajout-equipement"
import AddSponsor from "./components/Admin/dashboard/sponsors/addSponsor";
import ListSponsor from "./components/Admin/dashboard/sponsors/listSponsor";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="home" path="/" element={<Home />} />,
    <Route key="login" path="login" element={<Signin />} />,
    <Route key="register" path="register" element={<Signup />} />,
    <Route key="admin" path="admin" element={<HomeAdmin />} />,
    <Route key="profileAdmin" path="profileAdmin" element={<ProfileAdmin />} />,


    <Route path='/dashboard' element={<Layout><DashboardKarima /></Layout>} />,
    <Route path='/coursekarima' element={<Layout><CourseKarima /> </Layout>} />,
    <Route path='/profilekarima' element={<Layout><ProfileKarima /> </Layout> } />,
    <Route path='/demand-add' element={<Layout><DemandAdd /> </Layout> } />,
    <Route path='/edit-demand/:id' element={<Layout><EditDemandAdd /> </Layout> } />,

    

    <Route path='/adduser' element={<Layout><AddUser /> </Layout> } />,
    <Route exact path="/edit/:id" element={<Layout><EditUser/> </Layout>} /> ,

    <Route path='/Add-Equipement' element={<Layout><AddEquipement /> </Layout>} />,
    <Route path='/edit-equipement/:id' element={<Layout><EditEquipement /> </Layout>} />,
    <Route path='/ajout-equipement' element={<Layout><AjoutEquipement /> </Layout>} />,

    <Route key="forgot" path="forgot" element={<ForgotPassword />} />,
    <Route key="reset" path="reset/:id/:token" element={<RestPassword />} />,
    <Route key="updateProfile" path="updateProfile" element={<UpdateProfile />} />,
   
    <Route key="sponsors" path="sponsors" element={<Layout><ListSponsor /> </Layout>} />,
    <Route key="addsponsor" path="addsponsor" element={<Layout><AddSponsor /> </Layout>} />,
   
<Route key="send-demand-page" exact path='/send-demand' element={<LayoutClient><SendDemand /> </LayoutClient> } />,
<Route key="private-send-demand" exact path="/send-demand" element={<PrivateRoute roles={['CLIENT','ADMIN']} />} />,



    <Route path='/list-demand' element={<LayoutClient><ListDemand /> </LayoutClient> } />,



    <Route key="accueil" exact path="/accueil" element={<LayoutClient><Accueil /> </LayoutClient> } />,
    <Route key="accueil" exact path="/accueil" element={<PrivateRoute roles={['CLIENT','ADMIN']} />} />,

    <Route key="notFound" path="/not-found" element={<NoRouteFound />} />,
    <Route key="fallback" path="*" element={<Navigate to="/not-found" />} />,
  ])
);

export default router;
