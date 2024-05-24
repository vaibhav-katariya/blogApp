import React from "react";
import { useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
const Profile = () => {
  useGetProfile();
  const profile = useSelector((state) => state.user.profile);
  return (
    <div className="h-screen w-full">
      <div className="h-[35%] md:h-[40%] w-full py-14 border-b-[1px] border-zinc-700">
        <div className="flex w-full items-center gap-5 md:gap-[3rem]">
          <div className="md:w-[8rem] md:h-[8rem] w-[5rem] h-[5rem] p-3 border-[1px] border-zinc-700 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={profile.user.avatar}
              alt="profile"
            />
          </div>
          <div className="my-2">
            <h1 className="text-2xl">{profile.user.username}</h1>
            <p>post {profile.posts_lenght}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
