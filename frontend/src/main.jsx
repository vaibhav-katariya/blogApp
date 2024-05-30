import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import { Provider, useSelector } from "react-redux";
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
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import BlogDetails from "./pages/blogDetails.jsx";
import OtherUserProfile from "./pages/OtherUserProfile.jsx";

let persistor = persistStore(store);

const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="create" element={<CreateBlog />} />
      <Route path="profile/:id" element={<OtherUserProfile />} />
      <Route path="profile" element={<Profile />} />
      <Route path="sign-up" element={<Signup />} />
      <Route path="blog-details/:id" element={<BlogDetails />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routers} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
