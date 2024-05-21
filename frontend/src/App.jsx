import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";
function App() {
  const user = localStorage.getItem("user")
  return (
    <>
      {user && <Header />}
      <Outlet />
      {user && <Footer />}
    </>
  );
}

export default App;
