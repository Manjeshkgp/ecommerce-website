import Navbar from "./components/navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "./slices/userSlice";
import { setCart } from "./slices/cartSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion"

function App() {
  const user = useSelector((state)=>state.user)
  const isAuthenticated = user.authenticated;
  const dispatch = useDispatch();
  const email = Cookies.get("email");
  const jwt = Cookies.get("jwt");
  const checkUser = async () => {
    if (
      email === undefined ||
      jwt === undefined ||
      email === null ||
      jwt === null
    ) {
      console.log("Login Rquired");
    } else if(isAuthenticated===true){
      console.log("Already Verified, may be via google")
    }else {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      const userData = await res.json();
      if (res.status === 200) {
        dispatch(addUser(userData));
        dispatch(setCart(userData?.cart));
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  const location = useLocation();
  return (
    <AnimatePresence>
    <div className="overflow-x-hidden">
      <div className="mb-12"><Navbar /></div>
      <Outlet />
      <Footer />
    </div>
    </AnimatePresence>
  );
}

export default App;
