import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, setUser } from "../store/userSlice";
import { getBlogs, getRefresh } from "../store/blogSlice";
const Header = () => {
  const user = useSelector((data) => data.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currUser = user.loggedInUser?._id;

  const signOutHandler = async () => {
    try {
      const res = await fetch("/api/v2/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        localStorage.clear();
        localStorage.removeItem("root");
        dispatch(setUser(null));
        dispatch(getMyProfile(null));
        dispatch(getBlogs([]));
        navigate("/login");
      }
      dispatch(getRefresh());
    } catch (error) {
      console.log("sign-out Error ", error);
    }
  };

  return (
    <>
      <nav className="flex justify-center h-[4rem] py-10 items-center px-[2rem]">
        <div className="flex justify-between items-center gap-7 md:gap-[5rem] border-b-[1px]  md:w-[50%]  border-zinc-700">
          <div className="text-[1.5rem] text-zinc-400">
            <Link to="/">
              <HiOutlineHome />
            </Link>
          </div>
          <img className="w-[6rem]" src="../../logo.png" alt="logo" />
          <div className="text-[1.5rem] text-zinc-400">
            <Link to={`/profile`}>
              <CgProfile />
            </Link>
          </div>
        </div>

        <div
          onClick={signOutHandler}
          className="text-[1.5rem] text-zinc-400 absolute end-4 md:end-10"
        >
          <PiSignOutBold />
        </div>
      </nav>
    </>
  );
};

export default Header;
