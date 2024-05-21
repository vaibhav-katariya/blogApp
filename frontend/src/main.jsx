import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import CreateBlog from "./pages/CreateBlog.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<CreateBlog />} / >
      <Route path="sign-up" element={<Signup />} / >
      <Route path="login" element={<Login />} / >
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);
