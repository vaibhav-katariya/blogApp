import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="h-[30rem] md:h-[35rem] w-full md:w-[45%] p-2 md:p-5 border-[1px] rounded-3xl border-zinc-700 my-5 ">
      <Link to={`/blog-details/${blog?._id}`}>
        <div className="h-[15rem] md:h-[20rem]">
          <img
            className="p-2 object-cover rounded-3xl h-[100%] w-[100%]"
            src={blog?.image}
            alt="img"
          />
        </div>
        <div className="p-2">
          <h2 className="text-2xl my-2 font-semibold truncate">
            {blog?.title}
          </h2>
          <p
            className="my-4 text-zinc-300  w-full overflow-hidden line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog?.description }}
          ></p>
          <div className="mt-5 flex items-center gap-3">
            <img
              className="h-10 w-10 border-[1px] border-zinc-700 p-1 rounded-full object-cover"
              src={blog?.owner?.avatar}
              alt={blog?._id}
            />
            <p>{blog?.owner?.username}</p>
          </div>
          <p className="text-end text-sm text-zinc-400">
            {blog.formattedTimeAgo}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
