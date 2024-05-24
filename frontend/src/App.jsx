import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const user = useSelector(data=>data?.user?.user)
  const navigate = useNavigate()
  if (!user) {
    useEffect(()=>{
      navigate("/login")
    },[])
  }

  return (
    <div className="bg-zinc-900 px-[2rem] text-white">
      {user && <Header />}
      <Outlet />
      {user && <Footer />}
    </div>
  );
}

export default App;
