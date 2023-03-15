import React from 'react';
import AdminNavbar from "../components/adminNavbar";
import Footer from "../components/footer";
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (<>
  <div className='overflow-x-hidden'>
  <AdminNavbar/>
  <Outlet/>
  <Footer/>
  </div>
  </>)
}

export default Admin