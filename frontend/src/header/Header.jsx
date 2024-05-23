import React from "react";
import { Link } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { HiOutlineHome } from "react-icons/hi2";
const Header = () => {
  return (
    <>
      <nav className="flex justify-center h-[4rem]  py-10 items-center px-[2rem]">
        <div className="flex justify-between items-center gap-7 md:gap-[10rem] border-b-[1px] md:w-[50%] border-zinc-700">
          <div className="text-[1.5rem] text-zinc-400">
            <Link to="/">
              <HiOutlineHome />
            </Link>
          </div>
          <img className="w-[6rem]" src="../../logo.png" alt="logo" />
          <div className="text-[1.5rem] text-zinc-400">
            <Link to='/profile'>
              <CgProfile />
            </Link>
          </div>
        </div>

        <div className="text-[1.5rem] text-zinc-400 absolute end-4 md:end-10">
          <CiMenuKebab />
        </div>
      </nav>
    </>
  );
};

export default Header;
