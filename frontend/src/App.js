import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { useDispatch,useSelector } from "react-redux";
import { addUser } from "./slices/userSlice";
import { setCart } from "./slices/cartSlice";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
