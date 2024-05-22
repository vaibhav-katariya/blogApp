import React from 'react'
import BlogCard from '../components/BlogCard'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-wrap justify-center gap-10 w-full my-10'>
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  )
}

export default Home
