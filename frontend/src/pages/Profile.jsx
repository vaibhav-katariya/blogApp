import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import { BsCloudUpload } from "react-icons/bs";
import { setUser } from "../store/userSlice";
import { getRefresh } from "../store/blogSlice";

const Profile = () => {
  useGetProfile();
  const profile = useSelector((state) => state.user.profile);
  const user = useSelector((data) => data.user.user);
  const blogs = useSelector((state) => state.blog.blogs);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: profile?.user?.username,
    email: profile?.user?.email,
  });
  const [avatar, setAvatar] = useState(profile?.user?.avatar);
  const [newAvatar, setNewAvatar] = useState();

  const userBlogs = blogs.filter(
    (item) => item?.owner?._id === profile?.user?._id
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setNewAvatar(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);

      if (newAvatar) {
        formData.append("avatar", newAvatar);
      }

      const res = await fetch("/api/v2/users/change-user-details", {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();
      dispatch(setUser(data.user));
      dispatch(getRefresh());
      setShowModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="h-[35%] md:h-[40%] w-full py-14 border-b-[1px] border-zinc-700">
        <div className="flex w-full items-center gap-5 md:gap-[3rem]">
          <div className="relative md:w-[8rem] md:h-[8rem] w-[5rem] h-[5rem] p-3 border-[1px] border-zinc-700 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover rounded-full"
              src={avatar}
              alt="profile"
            />
          </div>
          <div className="my-2 ">
            <div>
              <h1 className="text-2xl">{userData.username}</h1>
              <p>posts {profile?.posts_lenght}</p>
            </div>
            {profile?.user?._id === user?.loggedInUser?._id && (
              <button
                className="py-1 mt-5 -ms-1 px-3 my-2 bg-zinc-800 rounded-md font-semibold"
                onClick={() => setShowModal(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl m-5 flex md:justify-center">Blogs</h1>
        {userBlogs.length ? (
          <div className="flex flex-wrap justify-center gap-10 w-full my-10">
            {userBlogs.map((item, index) => (
              <BlogCard key={index} blog={item} />
            ))}
          </div>
        ) : (
          <div className="flex h-screen justify-center items-center">
            <h1 className="text-2xl">Create your blog</h1>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-800 bg-opacity-85">
          <div className="bg-zinc-900 p-8 rounded-lg">
            <h2 className="text-xl mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userData.username}
                name="username"
                onChange={handleInputChange}
                placeholder="Enter username"
                className="rounded-xl p-2 mb-4 w-full placeholder:text-zinc-800 bg-zinc-800"
              />
              <input
                type="email"
                value={userData.email}
                name="email"
                onChange={handleInputChange}
                placeholder="Enter email"
                className="rounded-xl p-2 mb-4 w-full placeholder:text-zinc-800 bg-zinc-800"
              />
              <input
                hidden
                ref={imageRef}
                type="file"
                name="avatar"
                onChange={handleAvatarChange}
              />
              <div
                className="rounded-xl text-zinc-400 border-2 mb-3 border-zinc-800 p-2 flex items-center gap-2 cursor-pointer"
                onClick={() => imageRef.current.click()}
              >
                <BsCloudUpload /> Update Profile Pic
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  className="px-4 rounded-full py-2 bg-blue-500 text-white hover:bg-blue-600 text-md font-semibold"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="px-4 rounded-full py-2 bg-zinc-800 text-white hover:bg-zinc-900 text-md font-semibold"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-10 py-2 flex justify-center items-center w-20 bg-zinc-800 rounded-full fixed right-6 bottom-5">
        <h1 className="text-white font-semibold text-xl">
          <Link to="/create">Create</Link>
        </h1>
      </div>
    </div>
  );
};

export default Profile;
