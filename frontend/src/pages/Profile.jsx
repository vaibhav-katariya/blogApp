import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const [user, setUser] = useState({});
  const [postLen, setPostLen] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/v2/users/get-current-user");
      const data = await res.json();
      setUser(data.userData.user);
      setPostLen(data.userData.posts_lenght);
    };
    getUser();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="h-[40%] w-full py-14 border-b-[1px] border-zinc-700">
        <div className="flex items-center gap-[3rem]">
          <div className="w-[8rem] h-[8rem] p-3 border-[1px] border-zinc-700 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={user.avatar}
              alt="profile"
            />
          </div>
          <div className="my-2">
            <h1 className="text-2xl">{user.username}</h1>
            <p>post {postLen}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
