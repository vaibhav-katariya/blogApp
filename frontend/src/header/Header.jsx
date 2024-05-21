import React from 'react'
import { NavLink } from 'react-router-dom'
import { CgMenuRound } from "react-icons/cg";
const Header = () => {
  return (
    <>
     <nav className='flex justify-between h-[4rem] items-center px-5 bg-zinc-900 text-white'>
        <h1 className='text-[1.2rem] font-semibold'>MY_BLOG</h1>
        <div className="nav-item hidden md:flex gap-6 ">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={'/create'}>Create Blog</NavLink>
          <NavLink>All Blog</NavLink>
          <NavLink>Profile</NavLink>
        </div>
        <div className="menu-icon md:hidden text-[1.5rem]">
        <CgMenuRound  />
        </div>
     </nav> 
    </>
  )
}

export default Header
