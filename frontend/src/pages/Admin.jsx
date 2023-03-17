import React,{useEffect} from 'react';
import AdminNavbar from "../components/adminNavbar";
import Footer from "../components/footer";
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { makeAdmin, addUser } from '../slices/userSlice';

const Admin = () => {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = Cookies.get("email");
  const adminToken = Cookies.get("adminToken");
  const checkVerification = async ()=> {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/verify`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${adminToken}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email
      })
    })
    const AdminData = await res.json();
    if(res.status===200){
      console.log("Verified");
      dispatch(addUser(AdminData));
      dispatch(makeAdmin());
    }else{
      navigate("/admin-login",{replace:true})
    }
  }

  useEffect(()=>{
    if(user.admin===false){
      if(!adminToken||adminToken===undefined||adminToken===null){
       return navigate("/admin-login",{replace:true});
      }
      checkVerification();
    }
  },[])

  return (<>
  <div className='overflow-x-hidden'>
  <div className='mb-12'><AdminNavbar/></div>
  <Outlet/>
  <Footer/>
  </div>
  </>)
}

export default Admin