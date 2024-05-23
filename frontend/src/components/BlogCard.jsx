import React from "react";

const BlogCard = ({blog}) => {

  return (
    <div className="min-h-[10rem] w-full md:w-[45%] p-2 md:p-5 border-[1px] rounded-3xl border-zinc-700 my-5 ">
      <div>
        <div className="">
          <img
            className="p-2 object-cover rounded-3xl h-[10rem] md:h-[25rem] w-[100%]"
            src={blog.image}
            alt="img"
          />
        </div>
        <div className="p-3">
          <h2 className="text-2xl my-2 font-semibold">{blog.title}</h2>
          <p className="my-4 text-zinc-300 truncate w-full">
            {blog.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <img
              className="h-10 w-10 border-[1px] border-zinc-700 p-1 rounded-full object-cover"
              src={blog.owner.avatar}
              alt=""
            />
            <p>{blog.owner.username}</p>
          </div>
          <p className="text-end text-sm text-zinc-400">19 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
