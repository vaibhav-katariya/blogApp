import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  const user = useSelector((data) => data.user.user);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="bg-zinc-900 px-[2rem] text-white">
      {user && <Header />}
      <Outlet />
      {user && <Footer />}
    </div>
  );
}

export default App;
