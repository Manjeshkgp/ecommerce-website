import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
