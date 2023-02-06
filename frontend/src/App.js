import Navbar from "./components/navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default App;
