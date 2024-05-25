import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRefresh } from "../store/blogSlice";

const BlogDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = useSelector((data) => data.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };
    getblog();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await fetch(`/api/v2/Blog/delete-blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getRefresh());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async () => {
    try {
      await fetch(`/api/v2/Blog/update-blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      setEditMode(false);
      dispatch(getRefresh());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen lg:mx-[15rem] my-10">
      {loading === false ? (
        <div className="min-h-screen w-full">
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
          <div className="h-[15rem] md:h-[30rem]">
            <img
              className="p-2 object-cover rounded-3xl h-[100%] w-[100%]"
              src={data?.image}
              alt={data?._id}
            />
          </div>
          <div className="p-2">
            {user?.loggedInUser?._id === data?.owner._id && (
              <div className="flex justify-end gap-3">
                <button
                  className="py-1 text-sm px-3 border-[1px] font-semibold text-red-500 hover:text-white hover:bg-red-600 hover:border-none rounded-full"
                  onClick={() => deleteHandler(data?._id)}
                >
                  DELETE
                </button>
                <button
                  className="py-1 text-sm px-3 border-[1px] font-semibold rounded-full"
                  onClick={() => setEditMode(true)}
                >
                  UPDATE
                </button>
              </div>
            )}
            {editMode ? (
              <form onSubmit={updateHandler} className="my-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full my-2 outline-none p-2 border-none rounded bg-zinc-800"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 my-2 outline-none border-none rounded resize-none bg-zinc-800"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="py-1 text-sm px-3 border-[1px] font-semibold rounded-full"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-1 text-sm px-3 border-[1px] font-semibold text-green-500 hover:text-white hover:bg-green-600 hover:border-none rounded-full"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-2xl my-2 font-semibold">{data?.title}</h2>
                <p className="my-4 text-zinc-300 w-full">{data?.description}</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <h1 className="flex justify-center items-center">Loading.....</h1>
      )}
    </div>
  );
};

export default BlogDetails;
