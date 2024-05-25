import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const getblog = async () => {
      try {
        const res = await fetch(`/api/v2/Blog/get-blog/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    };
    getblog();
  }, []);
  return (
    <div className="min-h-screen lg:mx-[15rem] my-10">
      {
        loading === false ? <div className="min-h-screen w-full">
        <div className="my-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="h-10 w-10 border-[1px] border-zinc-700 p-1 rounded-full object-cover"
              src={data?.owner?.avatar}
              alt={data?.owner?._id}
            />
            <p>{data?.owner?.username}</p>
          </div>
          <p className="text-end text-sm text-zinc-400">19 min ago</p>
        </div>
        <div className="h-[15rem] md:h-[20rem]">
          <img
            className="p-2 object-cover rounded-3xl h-[100%] w-[100%]"
            src={data?.image}
            alt={data?._id}
          />
        </div>
        <div className="p-2">
          <h2 className="text-2xl my-2 font-semibold">{data?.title}</h2>
          <p className="my-4 text-zinc-300 w-full text-">{data?.description}</p>
        </div>
      </div> : <h1 className="flex justify-center items-center">Loading.....</h1>
      }
    </div>
  );
};

export default BlogDetails;
