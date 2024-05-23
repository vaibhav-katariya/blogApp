import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import {Provider} from 'react-redux'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import CreateBlog from "./pages/CreateBlog.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import store from './store/store.js'

const user = localStorage.getItem("user");

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={user ? <Home /> : <Login />} />
      <Route path="create" element={user ? <CreateBlog /> : <Login />} />
      <Route path="profile" element={user ? <Profile /> : <Login />} />
      <Route path="sign-up" element={<Signup />} />
      <Route path="login" element={!user ? <Login /> : <Home />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routers} />
    </Provider>
  </React.StrictMode>
);
