import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css";

import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/login";
import VendorLogin from "./components/VendorLogin";
import AdminLogin from "./components/AdminLogin";
import VendorRegister from './components/VendorRegister';
import VendorHome from './components/VendorHome';
import PostBusiness from './components/PostBusiness';
import ViewMyBusiness from './components/ViewMyBusiness';
import UpdateBusiness from './components/UpdateBusiness';
import UserRegister from  "./components/UserRegister";
import UserHome from  "./components/UserHome";
import ViewBusiness from './components/ViewBusiness';
import ViewService from './components/ViewService';
import PostRequest from './components/PostRequest';
import ViewUserRequest from './components/ViewUserRequest';
import ViewMyRequest from './components/ViewMyRequest';
import UpdateStatus from './components/UpdateStatus';
import UserProfile from './components/UserProfile';
import EditUserProfile from './components/EditUserProfile';
import Index from './components/Index';
import PostFeedback from './components/PostFeedback';
import ViewMyFeedback from './components/ViewMyFeedback';
import AdminHome from './components/AdminHome';
import ViewBusinessAdmin from './components/ViewBusinessAdmin';
import UpdateStatusAdmin from './components/UpdateStatusAdmin';
import ViewUserAdmin from './components/ViewUserAdmin';
import LicenseForm from './components/LicenseForm';
import ChatBotApp from './components/ChatBotApp';
import ChatToggle from './components/ChatToggle';
import ResetPassword from './components/ResetPassword';
import ResetPasswordVendor from './components/ResetPasswordVendor';


function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
      
            <Route path='/LicenseForm' element={<LicenseForm />} />
            <Route path='/' element={<Index />} />
            <Route path='/user_login' element={<Login />} />
            <Route path='/vendor_register' element={<VendorRegister />} />
            <Route path='/admin_login' element={<AdminLogin />} />
            <Route path='/admin_home' element={<AdminHome />} />
            <Route path='/view_user_admin' element={<ViewUserAdmin />} />
            <Route path='/view_business_admin' element={<ViewBusinessAdmin />} />
            <Route path='/update_status_admin/:id' element={<UpdateStatusAdmin />} />
            <Route path='/vendor_login' element={<VendorLogin />} />
            <Route path='/vendor_home' element={<VendorHome />} />
            <Route path='/post_business' element={<PostBusiness />} />
            <Route path='/view_my_business' element={<ViewMyBusiness />} />
            <Route path='/update_business/:id' element={<UpdateBusiness />} />
            <Route path='/post_request' element={<PostRequest />} />
            <Route path='/view_user_request' element={<ViewUserRequest />} />
            <Route path='/view_my_request' element={<ViewMyRequest />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/edit_profile/:id' element={<EditUserProfile />} />
            <Route path='/update_status/:id' element={<UpdateStatus />} />
            <Route path='/post_feedback' element={<PostFeedback />} />
            <Route path='/view_my_feedback' element={<ViewMyFeedback />} />

            <Route path='/user_home' element={<UserHome />} />
            <Route path='/view_business/:id' element={<ViewBusiness />} />    
            <Route path='/view_service' element={<ViewService />} />          
            <Route path='/user_register' element={<UserRegister />} />

            <Route path='/chat_bot_app' element={<ChatBotApp />} />
            <Route path='/chat_toggle' element={<ChatToggle />} />
            <Route path='/reset_password' element={<ResetPassword />} />
            <Route path='/reset_password_vendor' element={<ResetPasswordVendor/>}/>
            

          </Routes>
        </BrowserRouter>
      </div>
    );
}



export default App;

{/*
unused 
import Viewlist from "./assets/unused/Viewlist";
import Edit from "./assets/unused/Edit";
import CreateBusiness from "./assets/unused/CreateBusiness";
import ViewAxios from "./assets/unused/ViewAxios";

<Route path='/viewtest' element={<Viewlist />} />            
<Route path='/axios' element={<ViewAxios />} />
<Route path='/create' element={<CreateBusiness />} />          
<Route path='/edit/:id' element={<Edit />} />

*/}