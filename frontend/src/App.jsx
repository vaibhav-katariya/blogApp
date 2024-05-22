import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  const user = localStorage.getItem("user")
  return (
    <div className="bg-zinc-900 px-[2rem] text-white">
      {user && <Header />}
      <Outlet />
      {user && <Footer />}
    </div>
  );
}

export default App;
