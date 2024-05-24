import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  const user = localStorage.getItem("user");
  return (
    <div className="bg-zinc-900 px-[2rem] text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
