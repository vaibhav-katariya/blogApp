import React from "react";

const BlogCard = () => {
  return (
    <div className="min-h-[10rem] w-full md:w-[45%] p-2 border-[1px] rounded-xl border-zinc-700 my-5 ">
      <div>
        <div className="">
          <img
            className="p-2 object-cover rounded-2xl h-[10rem] md:h-[20rem] w-[100%]"
            src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            alt="img"
          />
        </div>
        <div className="p-3 ">
          <h2 className="">Nature</h2>
          <p className="my-4 truncate w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            harum provident accusamus. Delectus fuga architecto quam repudiandae
            iure magni odio unde, eum sequi velit amet illum quibusdam
            dignissimos enim eius.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
              alt=""
            />
            <p>Author</p>
          </div>
          <p className="text-end  text-sm text-zinc-400">19 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
